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
      className="w-full py-stack-lg px-margin-mobile md:px-margin-desktop bg-[#0d0c11] border-t border-[#2a2833] min-h-screen flex items-center justify-center grid-bg"
      id="contact"
      data-motion-section
    >
      <div className="max-w-container-max mx-auto flex flex-col items-center text-center">
        <div className="space-y-12 max-w-4xl" data-motion-item>
          <div className="flex flex-col items-center gap-2 mb-4">
            <span className="font-label-caps text-label-caps text-[#d0bcff] uppercase tracking-widest">
              04 / Contact
            </span>
            <span className="font-label-caps text-xs text-[#a39fb0] opacity-60">
              数字化产品系统 / 2025
            </span>
          </div>

          <h2 className="font-display-hero text-5xl md:text-[140px] md:leading-[0.85] text-[#d0bcff] uppercase tracking-tighter mb-12 font-normal">
            {t('contact.stage.title') || '欢迎联系我'}
          </h2>

          <div className="flex flex-col items-center gap-6">
            <div className="flex flex-col md:flex-row gap-8 mt-6">
              {/* WeChat Button */}
              <div className="group flex flex-col items-center">
                <p className="font-label-caps text-label-caps text-[#a39fb0] uppercase tracking-widest mb-4">
                  {t('contact.stage.wechatLabel') || 'Phone / WeChat'}
                </p>
                <button
                  type="button"
                  onClick={() => copyText('wmeng219', 'wechat')}
                  className="px-10 py-5 bg-[#16151c] border border-[#2a2833] rounded-full font-headline-md text-headline-md text-[#ece9f1] hover:border-[#d0bcff]/40 hover:-translate-y-0.5 transition-all active:scale-95 flex items-center gap-3 cursor-pointer"
                >
                  <span>wmeng219</span>
                  <span className="material-symbols-outlined text-[#d0bcff]" aria-hidden="true">
                    {copiedWeChat ? 'check' : 'content_copy'}
                  </span>
                </button>
              </div>

              {/* Email Button */}
              <div className="group flex flex-col items-center">
                <p className="font-label-caps text-label-caps text-[#a39fb0] uppercase tracking-widest mb-4">
                  {t('contact.stage.emailLabel') || 'Email'}
                </p>
                <a
                  href="mailto:wmeng0219@gmail.com"
                  className="px-10 py-5 bg-[#16151c] border border-[#2a2833] rounded-full font-headline-md text-headline-md text-[#ece9f1] hover:border-[#d0bcff]/40 hover:-translate-y-0.5 transition-all active:scale-95 flex items-center gap-3 no-underline"
                >
                  <span>wmeng0219@gmail.com</span>
                  <span className="material-symbols-outlined text-[#d0bcff]" aria-hidden="true">
                    {copiedEmail ? 'check' : 'content_copy'}
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
