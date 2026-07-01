import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

const Contact = () => {
  const { t } = useLanguage();

  return (
    <section className="page-section contact-section" id="contact">
      <div className="section-shell contact-shell">
        <p className="section-kicker">{t('contact.kicker')}</p>
        <h2 className="section-title">{t('contact.title')}</h2>
        <p className="section-intro contact-intro">{t('contact.body')}</p>
        <a className="contact-email" href={`mailto:${t('contact.email')}`}>
          {t('contact.email')}
        </a>
        <div className="contact-actions">
          <a className="primary-link" href={`mailto:${t('contact.email')}`}>
            {t('contact.primary')}
          </a>
          <a className="secondary-link" href="#hero">
            {t('contact.secondary')}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
