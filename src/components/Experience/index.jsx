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

        <div className="experience-timeline" data-motion-group="experience-timeline">
          {items.map((item) => (
            <article className="experience-timeline-row" key={item} data-motion-item>
              <div className="experience-timeline-meta">
                <p className="experience-timeline-index">0{item}</p>
                <p className="experience-timeline-period">{t(`experience.item.${item}.period`)}</p>
              </div>
              <div className="experience-timeline-content">
                <p className="experience-timeline-tag">{t(`experience.stage.item.${item}.short`)}</p>
                <h3 className="experience-timeline-title">{t(`experience.item.${item}.title`)}</h3>
                <p className="experience-timeline-body">{t(`experience.item.${item}.body`)}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
