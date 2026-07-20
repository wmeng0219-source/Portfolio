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
  return (
    <Link
      to={card.href}
      className={`portfolio-entry ${card.featured ? 'portfolio-entry-featured' : ''} ${card.toneClass}`}
      data-motion-item
      data-motion-hover="card"
    >
      <div className="portfolio-entry-meta">
        <span className="portfolio-entry-id">{card.id}</span>
        <span className="portfolio-entry-label">{card.label}</span>
      </div>
      <div className="portfolio-entry-body">
        <p className="portfolio-entry-tag">{card.shortLabel}</p>
        <h3 className="portfolio-entry-title">{card.title}</h3>
        <p className="portfolio-entry-summary">{card.result}</p>
      </div>
      <div className="portfolio-entry-footer">
        <div className="portfolio-entry-metric">
          <span className="portfolio-entry-metricValue">{card.metric}</span>
          <span className="portfolio-entry-metricLabel">{card.metricLabel}</span>
        </div>
        <div className="portfolio-entry-phase">
          <span className="portfolio-entry-phaseValue">{card.phase}</span>
          <span className="portfolio-entry-phaseLabel">Core Direction</span>
        </div>
        <span className="portfolio-entry-action">VIEW CASE ↗</span>
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

        <div className="portfolio-stage-grid" data-motion-group="portfolio-stage">
          {cards.map((card) => (
            <PortfolioCard card={card} key={card.key} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
