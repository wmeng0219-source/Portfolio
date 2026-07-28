import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

const items = [1, 2, 3, 4];

const Experience = () => {
  const { t } = useLanguage();

  return (
    <section className="page-section experience-stage-section" id="experience" data-motion-section>
      <div className="section-shell">
        <div className="experience-stage-head" data-motion-item>
          <div className="experience-stage-head-top">
            <p className="experience-stage-kicker">03 / Path</p>
          </div>
          <div className="experience-stage-head-body">
            <h2 className="experience-stage-title">{t('experience.stage.title')}</h2>
            <p className="experience-stage-intro">{t('experience.stage.intro')}</p>
          </div>
        </div>

        <div className="experience-stage-grid" data-motion-group="experience-stage-grid">
          {items.map((item) => (
            <article
              className={`experience-stage-card experience-stage-card-${item}`}
              key={item}
              data-motion-item
            >
              <div className="experience-stage-card-shell">
                <div className="experience-stage-card-topline">
                  <p className="experience-stage-card-period">{t(`experience.item.${item}.period`)}</p>
                </div>
                <div className="experience-stage-card-copy">
                  <h3 className="experience-stage-card-title">
                    {t(`experience.item.${item}.title`)}
                    {t(`experience.stage.item.${item}.short`) && <span style={{ color: 'var(--color-text-secondary)', fontWeight: 400 }}> at {t(`experience.stage.item.${item}.short`)}</span>}
                  </h3>
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
