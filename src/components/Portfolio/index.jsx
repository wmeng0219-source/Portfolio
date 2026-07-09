import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

const featuredItem = 2;
const secondaryItems = [1, 3];

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
          <article className="portfolio-primary" data-motion-item="featured" data-motion-hover="card">
            <p className="portfolio-chapter-label">{t('portfolio.featured')}</p>
            <p className="portfolio-tag">{t(`portfolio.item.${featuredItem}.tag`)}</p>
            <h3 className="portfolio-primary-title">{t(`portfolio.item.${featuredItem}.title`)}</h3>
            <p className="portfolio-primary-body">{t(`portfolio.item.${featuredItem}.body`)}</p>
            <p className="portfolio-result">{t(`portfolio.item.${featuredItem}.result`)}</p>
          </article>

          <div className="portfolio-secondary" data-motion-group="portfolio-secondary">
            <p className="portfolio-side-label">{t('portfolio.secondaryLabel')}</p>
            {secondaryItems.map((item) => (
              <article className="portfolio-card" key={item} data-motion-item data-motion-hover="card">
                <p className="portfolio-tag">{t(`portfolio.item.${item}.tag`)}</p>
                <h3 className="portfolio-card-title">{t(`portfolio.item.${item}.title`)}</h3>
                <p className="portfolio-card-body">{t(`portfolio.item.${item}.body`)}</p>
                <p className="portfolio-result">{t(`portfolio.item.${item}.result`)}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
