import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

const Contact = () => {
  const { t } = useLanguage();

  return (
    <section className="page-section contact-stage-section" id="contact" data-motion-section>
      <div className="section-shell">
        <div className="contact-stage-grid" data-motion-item>
          {/* Left — big headline */}
          <div className="contact-stage-headline">
            <p className="contact-stage-kicker-new">04 / Contact</p>
            <h2 className="contact-stage-title-new">
              {t('contact.stage.title')}
            </h2>
          </div>

          {/* Right — intro + contact methods */}
          <div className="contact-stage-right">
            <p className="contact-stage-intro-new">{t('contact.stage.body')}</p>

            <div className="contact-stage-methods">
              {/* Email */}
              <div className="contact-method-block">
                <p className="contact-method-label">{t('contact.stage.emailLabel')}</p>
                <a
                  className="contact-method-value contact-method-link"
                  href={`mailto:${t('contact.email')}`}
                >
                  {t('contact.email')}
                  <span className="contact-method-arrow" aria-hidden="true">↗</span>
                </a>
              </div>

              {/* WeChat */}
              <div className="contact-method-block">
                <p className="contact-method-label">{t('contact.stage.wechatLabel')}</p>
                <p className="contact-method-value">{t('contact.wechat')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
