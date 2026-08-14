/**
 * 三档视口溢出与 console 错误检查（8-10 计划任务 5）
 * 用法：先启动 `npm run preview -- --port 4173 --strictPort` 与 headless Chrome
 *   （--remote-debugging-port=9222），再执行 `node scripts/viewport-check.mjs`
 */
const CDP = 'http://[::1]:9222';
const BASE = 'http://localhost:4173/Portfolio';
const SETTLE_MS = 2600;

const viewports = [
  { name: 'desktop-1440x900', width: 1440, height: 900 },
  { name: 'tablet-1024x768', width: 1024, height: 768 },
  { name: 'mobile-390x844', width: 390, height: 844, mobile: true },
];

const routes = [
  { name: 'home', path: '/' },
  { name: 'member-automation', path: '/#/project/member-automation' },
  { name: 'orthodontics', path: '/#/project/orthodontics' },
  { name: 'pacs-ai', path: '/#/project/pacs-ai' },
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function main() {
  const tab = await fetch(`${CDP}/json/new?about:blank`, { method: 'PUT' }).then((r) => r.json());
  const ws = new WebSocket(tab.webSocketDebuggerUrl);
  let seq = 0;
  const pending = new Map();
  const listeners = [];

  ws.onmessage = (e) => {
    const msg = JSON.parse(e.data);
    if (msg.id && pending.has(msg.id)) {
      pending.get(msg.id)(msg.result);
      pending.delete(msg.id);
    }
    listeners.forEach((fn) => fn(msg));
  };
  await new Promise((resolve, reject) => {
    ws.onopen = resolve;
    ws.onerror = reject;
  });

  const send = (method, params = {}) =>
    new Promise((resolve) => {
      const id = ++seq;
      pending.set(id, resolve);
      ws.send(JSON.stringify({ id, method, params }));
    });

  await send('Page.enable');
  await send('Runtime.enable');
  await send('Log.enable');

  let failures = 0;
  for (const vp of viewports) {
    await send('Emulation.setDeviceMetricsOverride', {
      width: vp.width,
      height: vp.height,
      deviceScaleFactor: 1,
      mobile: !!vp.mobile,
    });
    for (const route of routes) {
      const consoleErrors = [];
      const logErrors = [];
      const onMsg = (msg) => {
        if (msg.method === 'Runtime.consoleAPICalled' && msg.params.type === 'error') {
          consoleErrors.push(msg.params.args.map((a) => a.value ?? a.description ?? '').join(' '));
        }
        if (msg.method === 'Log.entryAdded' && msg.params.entry.level === 'error') {
          logErrors.push(msg.params.entry.text);
        }
      };
      listeners.push(onMsg);
      await send('Page.navigate', { url: BASE + route.path });
      await sleep(SETTLE_MS);

      const evalRes = await send('Runtime.evaluate', {
        expression: `JSON.stringify((() => {
          const de = document.documentElement;
          const overflowX = de.scrollWidth > de.clientWidth + 1;
          // 仅报告不在横向滚动容器内的越界元素（滚动容器内部元素属设计内行为）
          const isInsideHScroll = (el) => {
            let n = el.parentElement;
            while (n) {
              const cs = getComputedStyle(n);
              if (/^(auto|scroll|hidden|clip)$/.test(cs.overflowX) && n.scrollWidth > n.clientWidth + 1) return true;
              n = n.parentElement;
            }
            return false;
          };
          const wideEls = Array.from(document.querySelectorAll('body *'))
            .filter((el) => {
              const r = el.getBoundingClientRect();
              const cs = getComputedStyle(el);
              return r.right > de.clientWidth + 1 && !/^(hidden|clip|auto|scroll)$/.test(cs.overflowX) && !isInsideHScroll(el);
            })
            .slice(0, 6)
            .map((el) => (el.className && typeof el.className === 'string' ? el.className.split(' ').slice(0, 3).join('.') : el.tagName) + ' right=' + Math.round(el.getBoundingClientRect().right));
          return { overflowX, scrollW: de.scrollWidth, clientW: de.clientWidth, wideEls };
        })())`,
        returnByValue: true,
      });
      listeners.pop();

      const layout = JSON.parse(evalRes.result.value);
      const errors = [...consoleErrors, ...logErrors];
      const ok = !layout.overflowX && errors.length === 0;
      if (!ok) failures += 1;
      console.log(
        `${ok ? 'PASS' : 'FAIL'}  ${vp.name.padEnd(18)} ${route.name.padEnd(20)} overflowX=${layout.overflowX} (${layout.scrollW}/${layout.clientW})`,
      );
      if (layout.wideEls.length) console.log(`      wide: ${layout.wideEls.join(' | ')}`);
      if (errors.length) console.log(`      console: ${errors.slice(0, 4).join(' || ')}`);
    }
  }
  ws.close();
  console.log(failures === 0 ? '\n=== 全部通过 ===' : `\n=== ${failures} 项失败 ===`);
  process.exit(failures === 0 ? 0 : 1);
}

main().catch((err) => {
  console.error('脚本失败:', err.message);
  process.exit(2);
});
