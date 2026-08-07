import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

const Portfolio = () => {
  const { t } = useLanguage();

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
            <div className="w-full md:w-1/2 aspect-video rounded-[12px] overflow-hidden bg-white/5 p-2 flex items-center justify-center border border-[var(--color-border)]">
              <img
                alt={t('portfolio.item.1.title') || '会员自动化与服务衔接'}
                className="w-full h-full object-cover rounded-[8px] opacity-85 group-hover:opacity-100 transition-opacity"
                src="images/member/member_cover.svg"
              />
            </div>
            <div className="flex-1 flex flex-col justify-between space-y-4 w-full">
              <div className="space-y-3">
                <div className="flex items-center gap-2 font-mono text-xs text-[var(--color-accent)] tracking-wider">
                  <span>MEMBER AUTOMATION</span>
                  <span className="text-[var(--color-text-muted)]">•</span>
                  <span className="text-[var(--color-text-secondary)]">{t('portfolio.stage.item.1.short') || '规则系统重构'}</span>
                  <span className="font-mono text-[11px] text-[var(--color-text-muted)] uppercase tracking-widest ml-auto hidden sm:inline-block">
                    RULE SYSTEM
                  </span>
                </div>
                <h3 className="font-display text-2xl md:text-3xl text-[var(--color-text-primary)] font-semibold group-hover:text-[var(--color-accent)] transition-colors">
                  {t('portfolio.item.1.title') || '会员自动化与服务衔接'}
                </h3>
                <p className="text-[var(--color-text-secondary)] text-sm md:text-base leading-relaxed">
                  {t('portfolio.item.1.cardDesc') || '打通会员卡、卡券、收费与账单，实现高频收银流程自动化与财务合规治理。'}
                </p>
              </div>
              <div className="grid grid-cols-3 gap-4 border-t border-[var(--color-border)] pt-4">
                <div className="flex flex-col">
                  <span className="font-display text-xl md:text-2xl font-bold text-[var(--color-accent)]">{t('portfolio.item.1.metric.1.val') || '~1 分钟'}</span>
                  <span className="font-mono text-[11px] text-[var(--color-text-muted)] mt-1">{t('portfolio.item.1.metric.1.lbl') || '门店操作耗时'}</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-display text-xl md:text-2xl font-bold text-[var(--color-accent)]">{t('portfolio.item.1.metric.2.val') || '1 天'}</span>
                  <span className="font-mono text-[11px] text-[var(--color-text-muted)] mt-1">{t('portfolio.item.1.metric.2.lbl') || '财务月底对账'}</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-display text-xl md:text-2xl font-bold text-[var(--color-accent)]">{t('portfolio.item.1.metric.3.val') || '20+'}</span>
                  <span className="font-mono text-[11px] text-[var(--color-text-muted)] mt-1">{t('portfolio.item.1.metric.3.lbl') || '落地覆盖门店'}</span>
                </div>
              </div>
              <span className="sr-only">VIEW CASE ↗</span>
            </div>
          </Link>

          {/* Secondary Bento Grid Slide Pair (2-column layout on desktop) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Project 02: Orthodontics Funnel with Custom SVG Architectural Node Visual */}
            <Link
              to="/project/orthodontics"
              className="portfolio-showcase-card portfolio-showcase-card--support group"
              data-motion-item
              data-motion-hover="card"
            >
              {/* Architectural Process Diagram Graphic */}
              <div className="w-full h-44 bg-[var(--color-bg-elevated)] rounded-[12px] p-4 flex flex-col justify-between border border-[var(--color-border)] overflow-hidden">
                <div className="flex items-center justify-between text-[11px] font-mono text-[var(--color-system-green)]">
                  <span>STATE_MACHINE_FUNNEL</span>
                  <span className="text-[var(--color-text-muted)]">30-40% → 50-60%</span>
                </div>
                <svg className="w-full h-24" viewBox="0 0 360 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="10" y="20" width="90" height="40" rx="6" fill="rgba(184, 230, 208, 0.12)" stroke="#B8E6D0" strokeWidth="1.5"/>
                  <text x="55" y="44" fill="#B8E6D0" fontSize="11" fontFamily="monospace" textAnchor="middle">{t('portfolio.item.2.svg.step1') || '1. 儿牙初筛'}</text>
                  
                  <path d="M 100 40 L 130 40" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeDasharray="3 3"/>
                  <polygon points="130,36 137,40 130,44" fill="rgba(255,255,255,0.4)" />
                  
                  <rect x="137" y="20" width="90" height="40" rx="6" fill="rgba(200, 182, 255, 0.12)" stroke="#C8B6FF" strokeWidth="1.5"/>
                  <text x="182" y="44" fill="#C8B6FF" fontSize="11" fontFamily="monospace" textAnchor="middle">{t('portfolio.item.2.svg.step2') || '2. 正畸会诊'}</text>

                  <path d="M 227 40 L 257 40" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeDasharray="3 3"/>
                  <polygon points="257,36 264,40 257,44" fill="rgba(255,255,255,0.4)" />

                  <rect x="264" y="20" width="86" height="40" rx="6" fill="rgba(184, 230, 208, 0.2)" stroke="#B8E6D0" strokeWidth="1.5"/>
                  <text x="307" y="44" fill="#F2F2F5" fontSize="11" fontFamily="monospace" textAnchor="middle">{t('portfolio.item.2.svg.step3') || '3. 签约锁定'}</text>
                </svg>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 font-mono text-xs text-[var(--color-system-green)] tracking-wider">
                  <span>ORTHO FUNNEL</span>
                  <span className="text-[var(--color-text-muted)]">•</span>
                  <span className="text-[var(--color-text-secondary)]">{t('portfolio.stage.item.2.short') || '漏斗与角色协作'}</span>
                  <span className="font-mono text-[11px] text-[var(--color-text-muted)] uppercase tracking-widest ml-auto hidden sm:inline-block">
                    FLOW REBUILD
                  </span>
                </div>
                <h3 className="font-display text-xl md:text-2xl text-[var(--color-text-primary)] font-semibold group-hover:text-[var(--color-system-green)] transition-colors">
                  {t('portfolio.item.2.title') || '正畸筛查与状态管理'}
                </h3>
                <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed">
                  {t('portfolio.item.2.cardDesc') || '重构儿牙与正畸医生协作流程，建立从推荐到预约的可追踪状态机漏斗。'}
                </p>
              </div>

              <div className="border-t border-[var(--color-border)] pt-4">
                <div className="flex flex-col">
                  <span className="font-display text-2xl font-bold text-[var(--color-system-green)] leading-none">{t('portfolio.item.2.metric.val') || '50-60%'}</span>
                  <span className="font-mono text-[11px] text-[var(--color-text-muted)] mt-1.5">{t('portfolio.item.2.metric.lbl') || '矫正转化率 (原 30-40%)'}</span>
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
              <div className="w-full h-44 bg-[var(--color-bg-elevated)] rounded-[12px] p-2 flex items-center justify-center border border-[var(--color-border)] overflow-hidden">
                <img
                  alt={t('portfolio.item.3.title') || 'PACS 读片与 AI 辅助判断'}
                  className="w-full h-full object-contain opacity-90 group-hover:opacity-100 transition-opacity"
                  src="images/pacs/generated/pacs_hero_1784477678972.jpg"
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 font-mono text-xs text-[var(--color-accent)] tracking-wider">
                  <span>AI REVIEW LOOP</span>
                  <span className="text-[var(--color-text-muted)]">•</span>
                  <span className="text-[var(--color-text-secondary)]">{t('portfolio.stage.item.3.short') || '人机协作闭环'}</span>
                  <span className="font-mono text-[11px] text-[var(--color-text-muted)] uppercase tracking-widest ml-auto hidden sm:inline-block">
                    HUMAN + AI
                  </span>
                </div>
                <h3 className="font-display text-xl md:text-2xl text-[var(--color-text-primary)] font-semibold group-hover:text-[var(--color-accent)] transition-colors">
                  {t('portfolio.item.3.title') || 'PACS 读片与 AI 辅助判断'}
                </h3>
                <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed">
                  {t('portfolio.item.3.cardDesc') || '构建影像读片结构化留痕与 AI 人机协作闭环，形成算法与医生复核的数据飞轮。'}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 border-t border-[var(--color-border)] pt-4">
                <div className="flex flex-col">
                  <span className="font-display text-2xl font-bold text-[var(--color-accent)]">{t('portfolio.item.3.metric.1.val') || '3.46 颗'}</span>
                  <span className="font-mono text-[11px] text-[var(--color-text-muted)] mt-1">{t('portfolio.item.3.metric.1.lbl') || '均单龋齿检出'}</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-display text-2xl font-bold text-[var(--color-accent)]">{t('portfolio.item.3.metric.2.val') || '+140%'}</span>
                  <span className="font-mono text-[11px] text-[var(--color-text-muted)] mt-1">{t('portfolio.item.3.metric.2.lbl') || '检出率提升'}</span>
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
