import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { projects } from '../../data/projects';

const cardMeta = [
  {
    projectId: 'member-automation',
    localeId: 1,
    label: 'MEMBER AUTOMATION',
    phase: 'RULE SYSTEM',
    metric: {
      zh: '20+',
      en: '20+',
    },
    metricLabel: {
      zh: '门店落地',
      en: 'CLINICS LIVE',
    },
  },
  {
    projectId: 'orthodontics',
    localeId: 2,
    label: 'ORTHO FUNNEL',
    phase: 'FLOW REBUILD',
    metric: {
      zh: '50-60%',
      en: '50-60%',
    },
    metricLabel: {
      zh: '矫正转化率',
      en: 'CONVERSION',
    },
  },
  {
    projectId: 'pacs-ai',
    localeId: 3,
    label: 'AI REVIEW LOOP',
    phase: 'HUMAN + AI',
    metric: {
      zh: '+140%',
      en: '+140%',
    },
    metricLabel: {
      zh: '检出率提升',
      en: 'DETECTION LIFT',
    },
  },
];

const PortfolioCard = ({ card }) => {
  const cardClassName = card.featured ? 'portfolio-feature-card' : 'portfolio-side-card';

  return (
    <Link
      to={card.href}
      className={`portfolio-link ${cardClassName} ${card.toneClass}`}
      data-motion-item
      data-motion-hover="card"
    >
      <div className="portfolio-card-shell">
        <div className="portfolio-card-topline">
          <span className="portfolio-card-id">{card.id}</span>
          <span className="portfolio-card-label">{card.label}</span>
        </div>

        <div className="portfolio-card-copy">
          <p className="portfolio-card-tag">{card.shortLabel}</p>
          <h3 className="portfolio-card-title">{card.title}</h3>
        </div>

        <div className="portfolio-card-bottom">
          <div className="portfolio-card-metricBlock">
            <span className="portfolio-card-metric-value">{card.metric}</span>
            <span className="portfolio-card-metric-label">{card.metricLabel}</span>
          </div>

          <div className="portfolio-card-phaseBlock">
            <span className="portfolio-card-phase-value">{card.phase}</span>
            <span className="portfolio-card-phase-label">Core Direction</span>
          </div>

          <div className="portfolio-card-action">
            <span className="portfolio-card-action-label">VIEW CASE</span>
            <span className="portfolio-card-action-icon" aria-hidden="true">
              ↗
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

const Portfolio = () => {
  const { language, t } = useLanguage();

  const cards = cardMeta.map((item, index) => {
    const project = projects.find((entry) => entry.id === item.projectId);

    return {
      key: item.projectId,
      href: `/project/${item.projectId}`,
      index,
      id: `0${index + 1}`,
      localeId: item.localeId,
      label: item.label,
      phase: item.phase,
      metric: item.metric[language],
      metricLabel: item.metricLabel[language],
      title: t(`portfolio.item.${item.localeId}.title`),
      shortLabel: t(`portfolio.stage.item.${item.localeId}.short`),
      result: project?.result?.[language] ?? t(`portfolio.item.${item.localeId}.result`),
      toneClass: `portfolio-tone-${index + 1}`,
      featured: index === 0,
    };
  });

  return (
    <section className="page-section page-section-dark portfolio-stage-section" id="portfolio" data-motion-section>
      <div className="section-shell">
        <div className="portfolio-stage-head" data-motion-item>
          <p className="portfolio-stage-kicker">{t('portfolio.stage.kicker')}</p>
          <h2 className="portfolio-stage-title">{t('portfolio.stage.title')}</h2>
          <p className="portfolio-stage-intro">{t('portfolio.stage.intro')}</p>
        </div>

        <div className="portfolio-stage" data-motion-group="portfolio-stage">
          <PortfolioCard card={cards[0]} key={cards[0].key} />

          <div className="portfolio-side-stack">
            {cards.slice(1).map((card) => (
              <PortfolioCard card={card} key={card.key} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
