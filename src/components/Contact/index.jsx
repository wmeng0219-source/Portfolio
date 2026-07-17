import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

const Contact = () => {
  const { t } = useLanguage();

  return (
    <section className="page-section contact-stage-section" id="contact" data-motion-section>
      <div className="section-shell">
        <div className="contact-stage-shell" data-motion-item>
          <p className="contact-stage-kicker">{t('contact.stage.kicker')}</p>
          <h2 className="contact-stage-title">{t('contact.stage.title')}</h2>
          <p className="contact-stage-intro">{t('contact.stage.body')}</p>

          <div className="contact-stage-actions" data-motion-group="contact-stage-actions">
            <a
              className="contact-stage-link"
              data-motion-item
              href={`mailto:${t('contact.email')}`}
              aria-label={t('contact.email')}
            >
              <span className="contact-stage-link-label">{t('contact.stage.emailLabel')}</span>
              <span className="contact-stage-link-value">{t('contact.email')}</span>
            </a>
            <div className="contact-stage-link" data-motion-item>
              <span className="contact-stage-link-label">{t('contact.stage.wechatLabel')}</span>
              <span className="contact-stage-link-value">{t('contact.wechat')}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
