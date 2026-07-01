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

        <div className="timeline">
          {items.map((item) => (
            <article className="timeline-item" key={item}>
              <p className="timeline-label">{t(`experience.item.${item}.period`)}</p>
              <div>
                <h3 className="timeline-title">{t(`experience.item.${item}.title`)}</h3>
                <p className="timeline-body">{t(`experience.item.${item}.body`)}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
