import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';

const Contact = () => {
  const { t } = useLanguage();
  const [copiedWeChat, setCopiedWeChat] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const copyText = (text, type) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      if (type === 'wechat') {
        setCopiedWeChat(true);
        setTimeout(() => setCopiedWeChat(false), 2000);
      } else {
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 2000);
      }
    }
  };

  return (
    <section
      className="page-section contact-stage-section"
      id="contact"
      data-motion-section
    >
      <div className="section-shell">
        <div className="contact-stage-card" data-motion-item>
          <div className="contact-stage-head">
            <span className="contact-stage-kicker">
              {t('contact.stage.kicker') || '03 / CONTACT'}
            </span>
            <h2 className="contact-stage-title">
              {t('contact.stage.title') || '联系我'}
            </h2>
            <p className="contact-stage-intro">
              {t('contact.stage.body') || '欢迎直接交流。'}
            </p>
          </div>

          <div className="contact-stage-actions">
            {/* WeChat Button */}
            <div className="contact-action-group">
              <span className="contact-action-label">
                {t('contact.stage.wechatLabel') || 'Phone / WeChat'}
              </span>
              <button
                type="button"
                onClick={() => copyText('wmeng219', 'wechat')}
                className="contact-action-btn"
              >
                <span>wmeng219</span>
                <span className="material-symbols-outlined contact-action-icon" aria-hidden="true">
                  {copiedWeChat ? 'check' : 'content_copy'}
                </span>
              </button>
            </div>

            {/* Email Button */}
            <div className="contact-action-group">
              <span className="contact-action-label">
                {t('contact.stage.emailLabel') || 'Email'}
              </span>
              <a
                href="mailto:wmeng0219@gmail.com"
                className="contact-action-btn"
              >
                <span>wmeng0219@gmail.com</span>
                <span className="material-symbols-outlined contact-action-icon" aria-hidden="true">
                  mail
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
