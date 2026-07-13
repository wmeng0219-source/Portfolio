import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

const About = () => {
  const { t } = useLanguage();
  const items = [1, 2, 3];

  return (
    <section className="page-section page-section-dark" id="about" data-motion-section>
      <div className="section-shell about-grid">
        <div className="section-heading-block" data-motion-item>
          <h2 className="section-title">{t('about.title')}</h2>
          <p className="section-lead">{t('about.lead')}</p>
          <p>{t('about.body')}</p>
        </div>

        <div className="about-points" data-motion-group="about-points">
          {items.map((item) => (
            <article className="about-card" key={item} data-motion-item data-motion-hover="card">
              <p className="eyebrow-label">{t(`about.point.${item}.label`)}</p>
              <h3 className="about-card-title">{t(`about.point.${item}.title`)}</h3>
              <p className="about-card-body">{t(`about.point.${item}.body`)}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
