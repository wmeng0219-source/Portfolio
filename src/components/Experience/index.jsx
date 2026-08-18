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
            <p className="experience-stage-kicker">{t('experience.stage.kicker')}</p>
          </div>
          <div className="experience-stage-head-body">
            <h2 className="experience-stage-title">{t('experience.stage.title')}</h2>
            <p className="experience-stage-intro">{t('experience.stage.intro')}</p>
          </div>
        </div>

        <div className="growth-path" data-motion-group="growth-path">
          {items.map((item) => (
            <article
              className={`growth-path-step${item === items.length ? ' growth-path-step--current' : ''}`}
              key={item}
              data-motion-item
            >
              <div className="growth-path-marker" aria-hidden="true">
                <span className="growth-path-node" />
                {item < items.length && <span className="growth-path-line" />}
              </div>
              <p className="growth-path-index">{t(`experience.item.${item}.period`)}</p>
              <div className="growth-path-content">
                <div className="growth-path-heading-group">
                  <h3 className="growth-path-role">{t(`experience.item.${item}.title`)}</h3>
                  <p className="growth-path-tags">{t(`experience.item.${item}.tags`)}</p>
                </div>
                <p className="growth-path-body">{t(`experience.item.${item}.body`)}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
