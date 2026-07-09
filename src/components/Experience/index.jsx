import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

const items = [1, 2, 3];

const Experience = () => {
  const { t } = useLanguage();

  return (
    <section className="page-section" id="experience">
      <div className="section-shell">
        <p className="section-kicker">{t('experience.kicker')}</p>
        <div className="section-heading">
          <h2 className="section-title">{t('experience.title')}</h2>
          <p className="section-intro">{t('experience.intro')}</p>
        </div>

        <div className="phase-grid">
          {items.map((item) => (
            <article className="phase-card" key={item}>
              <p className="phase-label">{t(`experience.item.${item}.period`)}</p>
              <h3 className="phase-title">{t(`experience.item.${item}.title`)}</h3>
              <p className="phase-body">{t(`experience.item.${item}.body`)}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
