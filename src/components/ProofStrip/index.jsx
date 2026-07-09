import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import styles from './ProofStrip.module.css';

const items = [1, 2, 3];

const ProofStrip = () => {
  const { t } = useLanguage();

  return (
    <section className={styles.section} aria-label="proof-strip">
      <div className={styles.shell}>
        {items.map((item) => (
          <article className={styles.card} key={item}>
            <p className={styles.title}>{t(`proof.item.${item}.title`)}</p>
            <p className={styles.body}>{t(`proof.item.${item}.body`)}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default ProofStrip;
