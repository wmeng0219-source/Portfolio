import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

const About = () => {
  const { t } = useLanguage();
  const items = [1, 2, 3];

  return (
    <section className="page-section page-section-dark about-stage-section" id="about" data-motion-section>
      <div className="section-shell">
        <div className="about-stage-head" data-motion-item>
          <p className="about-stage-kicker">{t('about.stage.kicker')}</p>
          <h2 className="about-stage-title">{t('about.stage.title')}</h2>
          <p className="about-stage-intro">{t('about.stage.intro')}</p>
        </div>

        <div className="about-stage-grid" data-motion-group="about-stage-grid">
          {items.map((item) => (
            <article className="about-stage-card" key={item} data-motion-item data-motion-hover="card">
              <div className="about-stage-card-shell">
                <p className="about-stage-card-label">{t(`about.stage.card.${item}.label`)}</p>
                <h3 className="about-stage-card-title">{t(`about.stage.card.${item}.title`)}</h3>
                <p className="about-stage-card-body">{t(`about.stage.card.${item}.body`)}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
