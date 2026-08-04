import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { projects } from '../../data/projects';
import MemberAutomationCase from '../cases/MemberAutomation';
import OrthodonticsCase from '../cases/Orthodontics';
import PacsAiCase from '../cases/PacsAi';
import styles from './ProjectDetail.module.css';

export default function ProjectDetail() {
  const { id } = useParams();
  const { language } = useLanguage();
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <div className={styles.notFound}>
        <h2>{language === 'zh' ? '未找到该案例' : 'Project not found'}</h2>
        <Link to="/" className={styles.backLink}>
          ← {language === 'zh' ? '返回首页' : 'Back to Home'}
        </Link>
      </div>
    );
  }

  if (project.id === 'member-automation') {
    return <MemberAutomationCase project={project} />;
  }

  if (project.id === 'orthodontics') {
    return <OrthodonticsCase project={project} />;
  }

  if (project.id === 'pacs-ai') {
    return <PacsAiCase project={project} />;
  }

  return <MemberAutomationCase project={project} />;
}
