import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

const items = [1, 2, 3, 4];

const Experience = () => {
  const { t } = useLanguage();

  return (
    <section className="page-section experience-stage-section" id="experience" data-motion-section>
      <div className="section-shell">
        <div className="experience-stage-head" data-motion-item>
          <p className="experience-stage-kicker">{t('experience.stage.kicker')}</p>
          <h2 className="experience-stage-title">{t('experience.stage.title')}</h2>
          <p className="experience-stage-intro">{t('experience.stage.intro')}</p>
        </div>

        <div className="experience-stage-grid" data-motion-group="experience-stage-grid">
          {items.map((item) => (
            <article
              className={`experience-stage-card experience-stage-card-${item}`}
              key={item}
              data-motion-item
              data-motion-hover="card"
            >
              <div className="experience-stage-card-shell">
                <div className="experience-stage-card-topline">
                  <p className="experience-stage-card-index">0{item}</p>
                  <p className="experience-stage-card-period">{t(`experience.item.${item}.period`)}</p>
                </div>
                <div className="experience-stage-card-copy">
                  <p className="experience-stage-card-tag">{t(`experience.stage.item.${item}.short`)}</p>
                  <h3 className="experience-stage-card-title">{t(`experience.item.${item}.title`)}</h3>
                  <p className="experience-stage-card-body">{t(`experience.item.${item}.body`)}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
