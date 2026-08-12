import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ProjectBlueprintCover from '../ProjectBlueprintCover';

gsap.registerPlugin(ScrollTrigger);

const Portfolio = () => {
  const { t, language } = useLanguage();
  const sectionRef = useRef(null);

  // 指标数字滚动：进入视口后从 0 计数到目标值（保留单位/前后缀/小数位）
  useEffect(() => {
    const root = sectionRef.current;
    if (!root || typeof window.matchMedia !== 'function') {
      return undefined;
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined;
    }

    const nodes = Array.from(root.querySelectorAll('[data-countup]'));
    const tweens = nodes
      .map((node) => {
        const finalText = node.textContent || '';
        if (!/\d/.test(finalText)) {
          return null;
        }
        const state = { progress: 0 };
        const renderValue = () => {
          node.textContent = finalText.replace(/\d+(?:\.\d+)?/g, (raw) => {
            const decimals = raw.includes('.') ? raw.split('.')[1].length : 0;
            const value = parseFloat(raw) * state.progress;
            return decimals > 0 ? value.toFixed(decimals) : String(Math.round(value));
          });
        };
        return gsap.to(state, {
          progress: 1,
          duration: 1.2,
          ease: 'power2.out',
          onStart: renderValue,
          onUpdate: renderValue,
          scrollTrigger: { trigger: node, start: 'top 90%', once: true },
        });
      })
      .filter(Boolean);

    return () => {
      tweens.forEach((tween) => {
        if (tween.scrollTrigger) {
          tween.scrollTrigger.kill();
        }
        tween.kill();
      });
    };
  }, [language]);

  return (
    <section className="portfolio-showcase page-section" id="portfolio" data-motion-section>
      <div className="section-shell">
        {/* Clean, Breathable Section Header */}
        <div className="portfolio-showcase-head" data-motion-item>
          <span className="portfolio-showcase-kicker">
            {t('portfolio.stage.kicker') || 'SELECTED WORK'}
          </span>
          <h2 className="portfolio-showcase-title">
            {t('portfolio.stage.title') || '精选案例'}
          </h2>
          <p className="portfolio-showcase-intro">
            {t('portfolio.stage.intro') || '三个复杂系统案例，展示我如何把流程、规则与协作重组为可执行产品。'}
          </p>
        </div>

        {/* Deck Slide Layout Architecture (Main Feature + Bento Secondary Pair) */}
        <div className="portfolio-stage-grid" data-motion-group="portfolio-stage">
          {/* Main Feature Slide (Hero Case Study) */}
          <Link
            to="/project/member-automation"
            className="portfolio-showcase-card portfolio-showcase-card--lead group"
            data-motion-item
            data-motion-hover="card"
          >
            <div className="portfolio-showcase-visual portfolio-showcase-visual--lead">
              <ProjectBlueprintCover kind="member" />
            </div>
            <div className="flex-1 flex flex-col justify-between space-y-3 w-full">
              <div className="space-y-2">
                <div className="flex items-center gap-2 font-mono text-[11px] text-[var(--color-accent)] tracking-wider">
                  <span>MEMBER AUTOMATION</span>
                  <span className="text-[var(--color-text-muted)]">•</span>
                  <span className="text-[var(--color-text-secondary)]">{t('portfolio.stage.item.1.short') || '规则系统重构'}</span>
                  <span className="font-mono text-[10px] text-[var(--color-text-muted)] uppercase tracking-widest ml-auto hidden sm:inline-block">
                    RULE SYSTEM
                  </span>
                </div>
                <h3 className="font-display text-xl md:text-2xl text-[var(--color-text-primary)] font-semibold group-hover:text-[var(--color-accent)] transition-colors">
                  {t('portfolio.item.1.title') || '会员自动化与服务衔接'}
                </h3>
                <p className="text-[var(--color-text-secondary)] text-xs md:text-sm leading-relaxed">
                  {t('portfolio.item.1.cardDesc') || '打通会员卡、卡券、收费与账单，实现高频收银流程自动化与财务合规治理。'}
                </p>
              </div>
              <div className="grid grid-cols-3 gap-3 border-t border-[var(--color-border)] pt-3">
                <div className="flex flex-col">
                  <span className="font-display text-lg md:text-xl font-bold text-[var(--color-accent)]" data-countup>{t('portfolio.item.1.metric.1.val') || '~1 分钟'}</span>
                  <span className="font-mono text-[10px] text-[var(--color-text-muted)] mt-0.5">{t('portfolio.item.1.metric.1.lbl') || '门店操作耗时'}</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-display text-lg md:text-xl font-bold text-[var(--color-accent)]" data-countup>{t('portfolio.item.1.metric.2.val') || '1 天'}</span>
                  <span className="font-mono text-[10px] text-[var(--color-text-muted)] mt-0.5">{t('portfolio.item.1.metric.2.lbl') || '财务月底对账'}</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-display text-lg md:text-xl font-bold text-[var(--color-accent)]" data-countup>{t('portfolio.item.1.metric.3.val') || '20+'}</span>
                  <span className="font-mono text-[10px] text-[var(--color-text-muted)] mt-0.5">{t('portfolio.item.1.metric.3.lbl') || '落地覆盖门店'}</span>
                </div>
              </div>
              <span className="sr-only">VIEW CASE ↗</span>
            </div>
          </Link>

          {/* Secondary Bento Grid Slide Pair (2-column layout on desktop) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Project 02: Orthodontics Funnel with Custom SVG Architectural Node Visual */}
            <Link
              to="/project/orthodontics"
              className="portfolio-showcase-card portfolio-showcase-card--support group"
              data-motion-item
              data-motion-hover="card"
            >
              <ProjectBlueprintCover kind="orthodontics" />

              <div className="space-y-2">
                <div className="flex items-center gap-2 font-mono text-[11px] text-[var(--color-system-green)] tracking-wider">
                  <span>ORTHO FUNNEL</span>
                  <span className="text-[var(--color-text-muted)]">•</span>
                  <span className="text-[var(--color-text-secondary)]">{t('portfolio.stage.item.2.short') || '漏斗与角色协作'}</span>
                  <span className="font-mono text-[10px] text-[var(--color-text-muted)] uppercase tracking-widest ml-auto hidden sm:inline-block">
                    FLOW REBUILD
                  </span>
                </div>
                <h3 className="font-display text-lg md:text-xl text-[var(--color-text-primary)] font-semibold group-hover:text-[var(--color-system-green)] transition-colors">
                  {t('portfolio.item.2.title') || '正畸筛查与状态管理'}
                </h3>
                <p className="text-[var(--color-text-secondary)] text-xs md:text-sm leading-relaxed">
                  {t('portfolio.item.2.cardDesc') || '重构儿牙与正畸医生协作流程，建立从推荐到预约的可追踪状态机漏斗。'}
                </p>
              </div>

              <div className="border-t border-[var(--color-border)] pt-3 mt-auto">
                <div className="flex flex-col">
                  <span className="font-display text-lg md:text-xl font-bold text-[var(--color-system-green)] leading-none" data-countup>{t('portfolio.item.2.metric.val') || '50-60%'}</span>
                  <span className="font-mono text-[10px] text-[var(--color-text-muted)] mt-1">{t('portfolio.item.2.metric.lbl') || '矫正转化率 (原 30-40%)'}</span>
                </div>
              </div>
              <span className="sr-only">VIEW CASE ↗</span>
            </Link>

            {/* Project 03: PACS AI Review Loop */}
            <Link
              to="/project/pacs-ai"
              className="portfolio-showcase-card portfolio-showcase-card--support group"
              data-motion-item
              data-motion-hover="card"
            >
              <ProjectBlueprintCover kind="pacs" />

              <div className="space-y-2">
                <div className="flex items-center gap-2 font-mono text-[11px] text-[var(--color-accent)] tracking-wider">
                  <span>AI REVIEW LOOP</span>
                  <span className="text-[var(--color-text-muted)]">•</span>
                  <span className="text-[var(--color-text-secondary)]">{t('portfolio.stage.item.3.short') || '人机协作闭环'}</span>
                  <span className="font-mono text-[10px] text-[var(--color-text-muted)] uppercase tracking-widest ml-auto hidden sm:inline-block">
                    HUMAN + AI
                  </span>
                </div>
                <h3 className="font-display text-lg md:text-xl text-[var(--color-text-primary)] font-semibold group-hover:text-[var(--color-accent)] transition-colors">
                  {t('portfolio.item.3.title') || 'PACS 读片与 AI 辅助判断'}
                </h3>
                <p className="text-[var(--color-text-secondary)] text-xs md:text-sm leading-relaxed">
                  {t('portfolio.item.3.cardDesc') || '构建影像读片结构化留痕与 AI 人机协作闭环，形成算法与医生复核的数据飞轮。'}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 border-t border-[var(--color-border)] pt-3 mt-auto">
                <div className="flex flex-col">
                  <span className="font-display text-lg md:text-xl font-bold text-[var(--color-accent)]" data-countup>{t('portfolio.item.3.metric.1.val') || '3.46 颗'}</span>
                  <span className="font-mono text-[10px] text-[var(--color-text-muted)] mt-1">{t('portfolio.item.3.metric.1.lbl') || '均单龋齿检出'}</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-display text-lg md:text-xl font-bold text-[var(--color-accent)]" data-countup>{t('portfolio.item.3.metric.2.val') || '+140%'}</span>
                  <span className="font-mono text-[10px] text-[var(--color-text-muted)] mt-1">{t('portfolio.item.3.metric.2.lbl') || '检出率提升'}</span>
                </div>
              </div>
              <span className="sr-only">VIEW CASE ↗</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
