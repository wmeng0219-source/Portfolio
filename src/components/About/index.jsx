import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

const About = () => {
  const { t } = useLanguage();
  const items = [1, 2, 3];

  return (
    <section className="page-section page-section-dark" id="about">
      <div className="section-shell about-grid">
        <div className="section-heading-block">
          <p className="section-kicker">{t('about.kicker')}</p>
          <h2 className="section-title">{t('about.title')}</h2>
          <p className="section-lead">{t('about.lead')}</p>
          <p>{t('about.body')}</p>
        </div>

        <div className="about-points">
          {items.map((item) => (
            <article className="about-card" key={item}>
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
