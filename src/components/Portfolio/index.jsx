import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

const featuredItem = { id: 2, path: 'orthodontics' };
const secondaryItems = [
  { id: 1, path: 'member-automation' },
  { id: 3, path: 'pacs-ai' },
];

const Portfolio = () => {
  const { t } = useLanguage();

  return (
    <section className="page-section page-section-dark" id="portfolio" data-motion-section>
      <div className="section-shell">
        <div className="section-heading section-heading-episodic" data-motion-item>
          <div>
            <p className="section-kicker">{t('portfolio.kicker')}</p>
            <h2 className="section-title">{t('portfolio.title')}</h2>
          </div>
          <p className="section-intro">{t('portfolio.intro')}</p>
        </div>

        <div className="portfolio-stage" data-motion-group="portfolio-stage">
          <Link
            to={`/project/${featuredItem.path}`}
            className="portfolio-primary portfolio-link"
            data-motion-item="featured"
            data-motion-hover="card"
          >
            <p className="portfolio-chapter-label">{t('portfolio.featured')}</p>
            <p className="portfolio-tag">{t(`portfolio.item.${featuredItem.id}.tag`)}</p>
            <h3 className="portfolio-primary-title">{t(`portfolio.item.${featuredItem.id}.title`)}</h3>
            <p className="portfolio-primary-body">{t(`portfolio.item.${featuredItem.id}.body`)}</p>
            <p className="portfolio-primary-body">{t(`portfolio.item.${featuredItem.id}.reframe`)}</p>
            <p className="portfolio-result">{t(`portfolio.item.${featuredItem.id}.result`)}</p>
          </Link>

          <div className="portfolio-secondary" data-motion-group="portfolio-secondary">
            <p className="portfolio-side-label">{t('portfolio.secondaryLabel')}</p>
            {secondaryItems.map((item) => (
              <Link
                to={`/project/${item.path}`}
                className="portfolio-card portfolio-link"
                key={item.id}
                data-motion-item
                data-motion-hover="card"
              >
                <p className="portfolio-tag">{t(`portfolio.item.${item.id}.tag`)}</p>
                <h3 className="portfolio-card-title">{t(`portfolio.item.${item.id}.title`)}</h3>
                <p className="portfolio-card-body">{t(`portfolio.item.${item.id}.body`)}</p>
                <p className="portfolio-card-body">{t(`portfolio.item.${item.id}.reframe`)}</p>
                <p className="portfolio-result">{t(`portfolio.item.${item.id}.result`)}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
