import React from "react";
import { useLanguage } from "../../context/LanguageContext";

const items = [4, 3, 2, 1];

const Experience = () => {
  const { t } = useLanguage();

  return (
    <section className="page-section experience-stage-section" id="experience">
      <div className="section-shell home-career-layout">
        <div className="experience-stage-head">
          <p className="experience-stage-kicker">
            {t("experience.stage.kicker")}
          </p>
          <h2 className="experience-stage-title">
            {t("experience.stage.title")}
          </h2>
        </div>
        <ol className="career-list" aria-label={t("experience.stage.title")}>
          {items.map((item) => {
            const rawTags = t(`experience.item.${item}.tags`);
            const tags = Array.isArray(rawTags)
              ? rawTags
              : rawTags.split(" · ");
            return (
              <li className="career-entry" key={item}>
                <article className="career-row">
                  <p className="career-period">
                    {t(`experience.item.${item}.period`)}
                  </p>
                  <h3 className="career-role">
                    {t(`experience.item.${item}.title`)}
                  </h3>
                  <ul className="career-skills">
                    {tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                </article>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
};

export default Experience;
