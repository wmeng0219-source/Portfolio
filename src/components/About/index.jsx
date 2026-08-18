import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

const steps = [1, 2, 3, 4, 5];

const About = () => {
  const { t } = useLanguage();

  return (
    <section className="page-section page-section-dark how-i-work-section" id="about" data-motion-section>
      <div className="section-shell">
        <div className="how-i-work-head" data-motion-item>
          <p className="how-i-work-kicker">{t('about.stage.kicker') || '02 / HOW I WORK'}</p>
          <h2 className="how-i-work-title">{t('about.stage.title') || '工作方法 · 我如何把复杂问题变成系统'}</h2>
          <p className="how-i-work-intro">{t('about.stage.intro') || '从混乱复杂的业务现场出发，通过 5 步严密的产品思考流，把模糊问题收敛为稳定运行的产品系统。'}</p>
        </div>

        {/* 5-Step Process Matrix (Non-interactive Knowledge Map) */}
        <div className="how-i-work-grid" data-motion-group="how-i-work-grid">
          {steps.map((step) => (
            <div
              className={`how-i-work-card${step === 2 ? ' how-i-work-card--core' : ''}`}
              key={step}
              data-motion-item
            >
              <div className="how-i-work-card-top">
                <span className="how-i-work-step-num">0{step}</span>
                <span className="how-i-work-step-label">{t(`about.stage.step.${step}.label`)}</span>
              </div>
              <h3 className="how-i-work-card-title">{t(`about.stage.step.${step}.title`)}</h3>
              <p className="how-i-work-card-body">{t(`about.stage.step.${step}.body`)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
