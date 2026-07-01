import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

const items = [1, 2, 3];

const Portfolio = () => {
  const { t } = useLanguage();

  return (
    <section className="page-section page-section-dark" id="portfolio">
      <div className="section-shell">
        <div className="section-heading">
          <div>
            <p className="section-kicker">{t('portfolio.kicker')}</p>
            <h2 className="section-title">{t('portfolio.title')}</h2>
          </div>
          <p className="section-intro">{t('portfolio.intro')}</p>
        </div>

        <div className="work-list">
          {items.map((item) => (
            <article className="work-row" key={item}>
              <p className="work-category">{t(`portfolio.item.${item}.category`)}</p>
              <div className="work-body">
                <h3 className="work-title">{t(`portfolio.item.${item}.title`)}</h3>
                <p className="work-summary">{t(`portfolio.item.${item}.body`)}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
