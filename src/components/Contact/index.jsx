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
      className="w-full py-24 px-margin-mobile md:px-margin-desktop bg-[var(--color-bg-primary)] border-t border-[var(--color-border)] min-h-screen flex items-center justify-center relative overflow-hidden"
      id="contact"
      data-motion-section
    >
      <div className="max-w-container-max mx-auto flex flex-col items-center text-center relative z-10">
        <div className="space-y-12 max-w-4xl" data-motion-item>
          <div className="flex flex-col items-center gap-2 mb-4">
            <span className="font-mono text-xs text-[var(--color-accent)] tracking-[0.2em] uppercase">
              {t('contact.stage.kicker') || '05 / CONTACT'}
            </span>
          </div>

          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl leading-[1.0] text-[var(--color-text-primary)] uppercase tracking-tight mb-6 font-extrabold">
            {t('contact.stage.title') || '欢迎联系我'}
          </h2>
          <p className="text-[var(--color-text-secondary)] text-sm md:text-base max-w-xl mx-auto leading-relaxed font-serif font-light">
            {t('contact.stage.body') || '适合讨论流程复杂、协作困难、需要系统化落地的产品问题。'}
          </p>

          <div className="flex flex-col items-center gap-6 pt-4">
            <div className="flex flex-col sm:flex-row gap-6 mt-4">
              {/* WeChat Button */}
              <div className="group flex flex-col items-center">
                <p className="font-mono text-xs text-[var(--color-text-muted)] uppercase tracking-widest mb-3">
                  {t('contact.stage.wechatLabel') || 'Phone / WeChat'}
                </p>
                <button
                  type="button"
                  onClick={() => copyText('wmeng219', 'wechat')}
                  className="px-8 py-4 bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-[12px] font-mono text-base md:text-lg text-[var(--color-text-primary)] hover:border-[var(--color-border-accent)] hover:-translate-y-1 transition-all duration-200 active:scale-95 flex items-center gap-3 cursor-pointer"
                >
                  <span>wmeng219</span>
                  <span className="material-symbols-outlined text-[var(--color-accent)] text-lg" aria-hidden="true">
                    {copiedWeChat ? 'check' : 'content_copy'}
                  </span>
                </button>
              </div>

              {/* Email Button */}
              <div className="group flex flex-col items-center">
                <p className="font-mono text-xs text-[var(--color-text-muted)] uppercase tracking-widest mb-3">
                  {t('contact.stage.emailLabel') || 'Email'}
                </p>
                <a
                  href="mailto:wmeng0219@gmail.com"
                  className="px-8 py-4 bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-[12px] font-mono text-base md:text-lg text-[var(--color-text-primary)] hover:border-[var(--color-border-accent)] hover:-translate-y-1 transition-all duration-200 active:scale-95 flex items-center gap-3 no-underline"
                >
                  <span>wmeng0219@gmail.com</span>
                  <span className="material-symbols-outlined text-[var(--color-accent)] text-lg" aria-hidden="true">
                    mail
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
