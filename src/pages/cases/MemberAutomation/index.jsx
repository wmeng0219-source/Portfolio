import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../../context/LanguageContext';
import styles from './MemberAutomation.module.css';
import gsap from 'gsap';

export default function MemberAutomationCase({ project }) {
  const { language } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-animate]',
        { y: 24, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out' }
      );
    });
    return () => ctx.revert();
  }, []);

  if (!project) return null;

  return (
    <div className={styles.page}>
      <nav className={styles.nav}>
        <div className={styles.navInner}>
          <Link to="/" className={styles.backLink} data-animate>
            ← {language === 'zh' ? '返回首页' : 'Back to Home'}
          </Link>
        </div>
      </nav>

      <main className={styles.main}>
        <header className={styles.header}>
          <p className={styles.tag} data-animate>{project.tag?.[language] || project.tag}</p>
          <h1 className={styles.title} data-animate>{project.title?.[language] || project.title}</h1>
        </header>

        <section className={styles.section} data-animate>
          <h2 className={styles.sectionTitle}>{language === 'zh' ? '项目背景' : 'Background'}</h2>
          <p className={styles.text}>{project.background?.[language] || project.background}</p>
        </section>

        <section className={styles.section} data-animate>
          <h2 className={styles.sectionTitle}>{language === 'zh' ? '我的角色' : 'My Role'}</h2>
          <p className={styles.text}>{project.role?.[language] || project.role}</p>
        </section>

        <section className={styles.section} data-animate>
          <h2 className={styles.sectionTitle}>{language === 'zh' ? '核心问题' : 'Core Problem'}</h2>
          <p className={styles.text}>{project.problem?.[language] || project.problem}</p>
        </section>

        <section className={styles.section} data-animate>
          <h2 className={styles.sectionTitle}>{language === 'zh' ? '关键方案' : 'Key Solutions'}</h2>
          <div className={styles.solutions}>
            {project.solution?.map((sol, idx) => (
              <div key={idx} className={styles.solutionCard}>
                <h3 className={styles.solutionTitle}>{sol.title?.[language] || sol.title}</h3>
                <p className={styles.text}>{sol.desc?.[language] || sol.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section} data-animate>
          <h2 className={styles.sectionTitle}>{language === 'zh' ? '项目结果' : 'Result'}</h2>
          <div className={styles.resultCard}>
            <p className={styles.text}>{project.result?.[language] || project.result}</p>
          </div>
        </section>

        {project.images && project.images.length > 0 && (
          <section className={styles.imageSection} data-animate>
            <h2 className={styles.sectionTitle}>{language === 'zh' ? '设计图与流程展示' : 'Design & Flow'}</h2>
            <div className={styles.imageGallery}>
              {project.images.map((img, idx) => (
                <figure key={idx} className={styles.imageFigure}>
                  <img
                    src={img.src}
                    alt={img.alt?.[language] || img.alt}
                    className={styles.projectImage}
                    loading="lazy"
                    width="1024"
                    height="768"
                  />
                  <figcaption className={styles.imageCaption}>{img.alt?.[language] || img.alt}</figcaption>
                </figure>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
