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
        <div className="contact-methods" data-motion-group="contact-methods">
          <div className="contact-method" data-motion-item>
            <p className="contact-label">{t('contact.emailLabel')}</p>
            <a className="contact-value" href={`mailto:${t('contact.email')}`}>{t('contact.email')}</a>
          </div>
          <div className="contact-method" data-motion-item>
            <p className="contact-label">{t('contact.wechatLabel')}</p>
            <span className="contact-value">{t('contact.wechat')}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
