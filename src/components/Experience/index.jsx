import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

// Reverse chronological order: 2023 -> 2022 -> 2020 -> 2019
const items = [4, 3, 2, 1];

const Experience = () => {
  const { t } = useLanguage();

  return (
    <section className="page-section experience-stage-section" id="experience" data-motion-section>
      <div className="section-shell">
        <div className="experience-stage-head" data-motion-item>
          <div className="experience-stage-head-top">
            <p className="experience-stage-kicker">{t('experience.stage.kicker')}</p>
          </div>
          <div className="experience-stage-head-body">
            <h2 className="experience-stage-title">{t('experience.stage.title')}</h2>
          </div>
        </div>

        <div className="growth-path growth-timeline" data-motion-group="growth-path">
          <div className="growth-timeline-list">
            {items.map((item, index) => {
              const isCurrent = item === 4;
              const isRight = index % 2 === 0; // 4 (right), 3 (left), 2 (right), 1 (left)
              const rawTags = t(`experience.item.${item}.tags`);
              const tagList = Array.isArray(rawTags)
                ? rawTags
                : typeof rawTags === 'string'
                ? rawTags.split(' · ')
                : [];

              return (
                <article
                  className={`growth-timeline-item ${
                    isRight ? 'growth-timeline-item--right' : 'growth-timeline-item--left'
                  }${isCurrent ? ' growth-timeline-item--current' : ''}`}
                  key={item}
                  data-motion-item
                >
                  <div className="growth-timeline-marker" aria-hidden="true">
                    <span className="growth-path-node growth-timeline-node">
                      {isCurrent && <span className="growth-timeline-node-glow" />}
                    </span>
                  </div>

                  {index < items.length - 1 && (
                    <span className="growth-timeline-line" aria-hidden="true" />
                  )}

                  <div className="growth-timeline-card">
                    <div className="growth-timeline-card-header">
                      <span className="growth-timeline-period">
                        {t(`experience.item.${item}.period`)}
                      </span>
                      {isCurrent && (
                        <span className="growth-timeline-badge">
                          <span className="growth-timeline-badge-dot" />
                          ACTIVE
                        </span>
                      )}
                    </div>

                    <h3 className="growth-timeline-role">
                      {t(`experience.item.${item}.title`)}
                    </h3>

                    {tagList.length > 0 && (
                      <div className="growth-timeline-chips" aria-label="Capabilities">
                        {tagList.map((tag, tagIdx) => (
                          <span key={tagIdx} className="growth-timeline-chip">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
