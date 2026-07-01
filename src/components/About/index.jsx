import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

const About = () => {
  const { t } = useLanguage();

  return (
    <section className="page-section page-section-dark" id="about">
      <div className="section-shell section-split">
        <div>
          <p className="section-kicker">{t('about.kicker')}</p>
          <h2 className="section-title">{t('about.title')}</h2>
        </div>

        <div className="section-copy">
          <p className="section-lead">{t('about.lead')}</p>
          <p>{t('about.body')}</p>
          <ul className="feature-list">
            <li>{t('about.point.1')}</li>
            <li>{t('about.point.2')}</li>
            <li>{t('about.point.3')}</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default About;
