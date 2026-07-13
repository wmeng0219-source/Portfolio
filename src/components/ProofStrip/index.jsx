import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import styles from './ProofStrip.module.css';

const items = [1, 2, 3];

const ProofStrip = () => {
  const { t } = useLanguage();
  const headingId = 'proof-strip-title';

  return (
    <section className={styles.section} aria-labelledby={headingId} data-motion-section>
      <div className={styles.chapter}>
        <h2 className={styles.chapterTitle} id={headingId}>
          {t('proof.title')}
        </h2>
      </div>

      <div className={styles.shell} data-motion-group="proof">
        {items.map((item) => (
          <article className={styles.card} key={item} data-motion-item data-motion-hover="card">
            <p className={styles.eyebrow}>{t(`proof.item.${item}.label`)}</p>
            <p className={styles.title}>{t(`proof.item.${item}.title`)}</p>
            <p className={styles.body}>{t(`proof.item.${item}.body`)}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default ProofStrip;
