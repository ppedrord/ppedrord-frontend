import React from 'react';
import styles from './ContentSection.module.css';

function AboutSection({ id }) {
  return (
    <section id={id} className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>About Me</h2>

        <p>
          I truly believe that practice leads to improvement. Therefore, you should never
          stop working, learning new things, because there will always be new things for
          us to learn. Driven by curiosity and the desire to develop myself in different
          areas of knowledge, I have sought—both in my academic and work journeys—to
          learn from the best with humility, add new ideas to the market, and be
          collaborative and resilient to achieve my goals and dreams.
        </p>
      </div>

      {/* Detalhes pessoais em grade responsiva */}
      <div className={`${styles.container} ${styles.detailsGrid}`}>
        {/* Coluna 1 */}
        <ul className={styles.list}>
          <li className={styles.listItem}>
            <span className={styles.label}>Birth:</span>{' '}
            <span className={styles.value}>29 Oct 1999</span>
          </li>
          <li className={styles.listItem}>
            <span className={styles.label}>Age:</span>{' '}
            <span className={styles.value}>25 years</span>
          </li>
          <li className={styles.listItem}>
            <span className={styles.label}>City:</span>{' '}
            <span className={styles.value}>Campos dos Goytacazes</span>
          </li>
          <li className={styles.listItem}>
            <span className={styles.label}>State:</span>{' '}
            <span className={styles.value}>Rio de Janeiro</span>
          </li>
        </ul>

        {/* Coluna 2 */}
        <ul className={styles.list}>
          <li className={styles.listItem}>
            <span className={styles.label}>Hobby:</span>{' '}
            <span className={styles.value}>Boxe</span>
          </li>
          <li className={styles.listItem}>
            <span className={styles.label}>Languages:</span>{' '}
            <span className={styles.value}>English / Portuguese</span>
          </li>
          <li className={styles.listItem}>
            <span className={styles.label}>Working at:</span>{' '}
            <span className={styles.value}>Druid</span>
          </li>
          <li className={styles.listItem}>
            <span className={styles.label}>Current Position:</span>{' '}
            <span className={styles.value}>Software Developer & Tech Lead</span>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default AboutSection;
