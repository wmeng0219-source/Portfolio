import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { projects } from '../../data/projects';
import MemberAutomationCase from '../cases/MemberAutomation';
import OrthodonticsCase from '../cases/Orthodontics';
import PacsAiCase from '../cases/PacsAi';
import PreVisitEngineCase from '../cases/PreVisitEngine';
import styles from './ProjectDetail.module.css';

const caseMap = {
  'member-automation': MemberAutomationCase,
  'orthodontics': OrthodonticsCase,
  'pacs-ai': PacsAiCase,
  'pre-visit-engine': PreVisitEngineCase,
};

export default function ProjectDetail() {
  const { id } = useParams();
  const { language } = useLanguage();
  const project = projects.find((p) => p.id === id);
  const CaseComponent = caseMap[id];

  if (!project || !CaseComponent) {
    return (
      <div className={styles.notFound}>
        <h2>{language === 'zh' ? '未找到该案例' : 'Project Not Found'}</h2>
        <Link to="/" state={{ scrollTo: 'portfolio' }} className={styles.backLink}>
          ← {language === 'zh' ? '返回首页' : 'Back to Home'}
        </Link>
      </div>
    );
  }

  return <CaseComponent project={project} />;
}
