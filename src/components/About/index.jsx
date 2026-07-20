import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

const About = () => {
  const { t } = useLanguage();
  const items = [1, 2, 3];

  return (
    <section className="page-section page-section-dark about-stage-section" id="about" data-motion-section>
      <div className="section-shell">
        <div className="about-stage-head" data-motion-item>
          <p className="about-stage-kicker">01 / Method</p>
          <h2 className="about-stage-title">{t('about.stage.title')}</h2>
          <p className="about-stage-intro">{t('about.stage.intro')}</p>
        </div>

        <div className="about-stage-list" data-motion-group="about-stage-list">
          {items.map((item) => (
            <article className="about-stage-row" key={item} data-motion-item>
              <p className="about-stage-row-label">{t(`about.stage.card.${item}.label`)}</p>
              <div className="about-stage-row-main">
                <h3 className="about-stage-row-title">{t(`about.stage.card.${item}.title`)}</h3>
                <p className="about-stage-row-body">{t(`about.stage.card.${item}.body`)}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
