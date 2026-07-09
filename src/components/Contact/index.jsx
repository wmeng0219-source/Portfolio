import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

const Contact = () => {
  const { t } = useLanguage();

  return (
    <section className="page-section contact-section" id="contact" data-motion-section>
      <div className="section-shell contact-shell">
        <p className="section-kicker" data-motion-item>{t('contact.kicker')}</p>
        <h2 className="section-title" data-motion-item>{t('contact.title')}</h2>
        <p className="section-intro contact-intro" data-motion-item>{t('contact.body')}</p>
        <div className="contact-actions" data-motion-item>
          <a className="primary-link" href={`mailto:${t('contact.email')}`} data-motion-hover="button">
            {t('contact.primary')}
          </a>
        </div>
        <span className="contact-email" data-motion-item>{t('contact.email')}</span>
        <a className="secondary-link contact-backlink" href="#hero" data-motion-hover="button">
          {t('contact.secondary')}
        </a>
      </div>
    </section>
  );
};

export default Contact;
