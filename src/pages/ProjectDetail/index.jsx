import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { projects } from '../../data/projects';
import styles from './ProjectDetail.module.css';
import gsap from 'gsap';

export default function ProjectDetail() {
  const { id } = useParams();
  const { language } = useLanguage();
  const project = projects.find((p) => p.id === id);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-animate]',
        { y: 24, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out' }
      );
    });
    return () => ctx.revert();
  }, [id]);

  if (!project) {
    return (
      <div className={styles.notFound}>
        <h2>Project not found</h2>
        <Link to="/" className={styles.backLink}>← Back to Home</Link>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <nav className={styles.nav}>
        <Link to="/" className={styles.backLink} data-animate>
          ← {language === 'zh' ? '返回首页' : 'Back to Home'}
        </Link>
      </nav>

      <main className={styles.main}>
        <header className={styles.header}>
          <p className={styles.tag} data-animate>{project.tag[language]}</p>
          <h1 className={styles.title} data-animate>{project.title[language]}</h1>
        </header>

        <section className={styles.section} data-animate>
          <h2 className={styles.sectionTitle}>{language === 'zh' ? '项目背景' : 'Background'}</h2>
          <p className={styles.text}>{project.background[language]}</p>
        </section>

        <section className={styles.section} data-animate>
          <h2 className={styles.sectionTitle}>{language === 'zh' ? '我的角色' : 'My Role'}</h2>
          <p className={styles.text}>{project.role[language]}</p>
        </section>

        <section className={styles.section} data-animate>
          <h2 className={styles.sectionTitle}>{language === 'zh' ? '核心问题' : 'Core Problem'}</h2>
          <p className={styles.text}>{project.problem[language]}</p>
        </section>

        <section className={styles.section} data-animate>
          <h2 className={styles.sectionTitle}>{language === 'zh' ? '关键方案' : 'Key Solutions'}</h2>
          <div className={styles.solutions}>
            {project.solution.map((sol, idx) => (
              <div key={idx} className={styles.solutionCard}>
                <h3 className={styles.solutionTitle}>{sol.title[language]}</h3>
                <p className={styles.text}>{sol.desc[language]}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section} data-animate>
          <h2 className={styles.sectionTitle}>{language === 'zh' ? '项目结果' : 'Result'}</h2>
          <div className={styles.resultCard}>
            <p className={styles.text}>{project.result[language]}</p>
          </div>
        </section>
      </main>
    </div>
  );
}
