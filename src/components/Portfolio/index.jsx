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

        {/* Sticky Case Stack（DESIGN.md 4.5：连续案例堆叠，文件夹式描边 + 超大渐变标题） */}
        <div className="portfolio-stage-grid" data-motion-group="portfolio-stage">
          {/* Case 01 — Member Automation */}
          <Link
            to="/project/member-automation"
            className="portfolio-showcase-card portfolio-showcase-card--stack"
            data-motion-item
            data-motion-hover="card"
          >
            <div className="portfolio-showcase-visual portfolio-showcase-visual--stack">
              <ProjectBlueprintCover kind="member" />
            </div>
            <div className="portfolio-showcase-body">
              <div className="portfolio-showcase-card-header">
                <span className="portfolio-showcase-badge">{t('portfolio.item.1.tag') || '01 / 规则治理'}</span>
                <span className="portfolio-showcase-role">{t('portfolio.item.1.role')}</span>
              </div>
              <h3 className="portfolio-showcase-card-title">
                {t('portfolio.item.1.title') || '会员与收银自动化'}
              </h3>
              <p className="portfolio-showcase-problem">
                {t('portfolio.item.1.problem')}
              </p>
              <div className="portfolio-showcase-card-metrics">
                <div className="portfolio-showcase-card-metric">
                  <span className="portfolio-showcase-metric-value" data-countup>{t('portfolio.item.1.metric.1.val') || '~80% ↓'}</span>
                  <span className="portfolio-showcase-metric-label">{t('portfolio.item.1.metric.1.lbl')}</span>
                </div>
                <div className="portfolio-showcase-card-metric">
                  <span className="portfolio-showcase-metric-value">{t('portfolio.item.1.metric.2.val') || '20+ 门店'}</span>
                  <span className="portfolio-showcase-metric-label">{t('portfolio.item.1.metric.2.lbl')}</span>
                </div>
                <div className="portfolio-showcase-card-metric">
                  <span className="portfolio-showcase-metric-value">{t('portfolio.item.1.metric.3.val') || '降低风控'}</span>
                  <span className="portfolio-showcase-metric-label">{t('portfolio.item.1.metric.3.lbl')}</span>
                </div>
              </div>
              <span className="sr-only">VIEW CASE ↗</span>
            </div>
          </Link>

          {/* Case 02 — Orthodontics Funnel */}
          <Link
            to="/project/orthodontics"
            className="portfolio-showcase-card portfolio-showcase-card--stack"
            data-motion-item
            data-motion-hover="card"
          >
            <div className="portfolio-showcase-visual portfolio-showcase-visual--stack">
              <ProjectBlueprintCover kind="orthodontics" />
            </div>
            <div className="portfolio-showcase-body">
              <div className="portfolio-showcase-card-header">
                <span className="portfolio-showcase-badge portfolio-showcase-badge--mint">{t('portfolio.item.2.tag') || '02 / 流程协作'}</span>
                <span className="portfolio-showcase-role">{t('portfolio.item.2.role')}</span>
              </div>
              <h3 className="portfolio-showcase-card-title">
                {t('portfolio.item.2.title') || '正畸筛查与协作工作流'}
              </h3>
              <p className="portfolio-showcase-problem">
                {t('portfolio.item.2.problem')}
              </p>
              <div className="portfolio-showcase-card-metrics">
                <div className="portfolio-showcase-card-metric">
                  <span className="portfolio-showcase-metric-value" data-countup>{t('portfolio.item.2.metric.1.val') || '50–60%'}</span>
                  <span className="portfolio-showcase-metric-label">{t('portfolio.item.2.metric.1.lbl')}</span>
                </div>
                <div className="portfolio-showcase-card-metric">
                  <span className="portfolio-showcase-metric-value">{t('portfolio.item.2.metric.2.val') || '全流程'}</span>
                  <span className="portfolio-showcase-metric-label">{t('portfolio.item.2.metric.2.lbl')}</span>
                </div>
                <div className="portfolio-showcase-card-metric">
                  <span className="portfolio-showcase-metric-value">{t('portfolio.item.2.metric.3.val') || '持续管理'}</span>
                  <span className="portfolio-showcase-metric-label">{t('portfolio.item.2.metric.3.lbl')}</span>
                </div>
              </div>
              <span className="sr-only">VIEW CASE ↗</span>
            </div>
          </Link>

          {/* Case 03 — PACS AI Review Loop */}
          <Link
            to="/project/pacs-ai"
            className="portfolio-showcase-card portfolio-showcase-card--stack"
            data-motion-item
            data-motion-hover="card"
          >
            <div className="portfolio-showcase-visual portfolio-showcase-visual--stack">
              <ProjectBlueprintCover kind="pacs" />
            </div>
            <div className="portfolio-showcase-body">
              <div className="portfolio-showcase-card-header">
                <span className="portfolio-showcase-badge portfolio-showcase-badge--pink">{t('portfolio.item.3.tag') || '03 / 人机协同'}</span>
                <span className="portfolio-showcase-role">{t('portfolio.item.3.role')}</span>
              </div>
              <h3 className="portfolio-showcase-card-title">
                {t('portfolio.item.3.title') || 'PACS 影像 AI 辅助读片'}
              </h3>
              <p className="portfolio-showcase-problem">
                {t('portfolio.item.3.problem')}
              </p>
              <div className="portfolio-showcase-card-metrics">
                <div className="portfolio-showcase-card-metric">
                  <span className="portfolio-showcase-metric-value" data-countup>{t('portfolio.item.3.metric.1.val') || '+140%'}</span>
                  <span className="portfolio-showcase-metric-label">{t('portfolio.item.3.metric.1.lbl')}</span>
                </div>
                <div className="portfolio-showcase-card-metric">
                  <span className="portfolio-showcase-metric-value">{t('portfolio.item.3.metric.2.val') || '全留痕'}</span>
                  <span className="portfolio-showcase-metric-label">{t('portfolio.item.3.metric.2.lbl')}</span>
                </div>
                <div className="portfolio-showcase-card-metric">
                  <span className="portfolio-showcase-metric-value">{t('portfolio.item.3.metric.3.val') || '人机闭环'}</span>
                  <span className="portfolio-showcase-metric-label">{t('portfolio.item.3.metric.3.lbl')}</span>
                </div>
              </div>
              <span className="sr-only">VIEW CASE ↗</span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
