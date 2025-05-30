import React, { useState } from 'react';
import sectionStyles from './ContentSection.module.css';
import styles from './PortfolioSection.module.css';
import Button from '../../../components/common/Button';

import programmingChallengesImg from '../../../images/programming-challenges.png';
import pytestFixturesImg from '../../../images/pytest-fixtures.png';
import mongoDbLogoImg from '../../../images/mongoDB-logo.png';

// imagens devem estar em public/images ou altere o caminho conforme seu build
const items = [
  {
    id: 1,
    title: 'Programming Challenges',
    img: programmingChallengesImg,
    text: 'GitHub repo with several solutions for Codility and beecrowd problems.',
    url: '#',
  },
  {
    id: 2,
    title: 'Pytest Fixtures',
    img: pytestFixturesImg,
    text: 'Slide deck explaining tests and fixtures, presented to my team at TITAN.',
    url: '#',
  },
  {
    id: 3,
    title: 'MongoDB Project',
    img: mongoDbLogoImg,
    text: 'Repo showcasing Pymongo helpers plus pytest-fixtures for integration tests.',
    url: '#',
  },
];

function PortfolioSection({ id = 'portfolio' }) {
  const [active, setActive] = useState(0);

  const prev = () => setActive((i) => (i === 0 ? items.length - 1 : i - 1));
  const next = () => setActive((i) => (i === items.length - 1 ? 0 : i + 1));

  return (
    <section
      id={id}
      className={`${sectionStyles.section} ${sectionStyles.alternateBg}`}
    >
      <div className={sectionStyles.container}>
        <h2 className={sectionStyles.title}>Portfolio</h2>

        {/* CAROUSEL */}
        <div
          style={{
            position: 'relative',
            overflow: 'hidden',
            maxWidth: 900,
            margin: '0 auto',
          }}
        >
          <div
            className={styles.track}
            style={{ transform: `translateX(-${active * 100}%)` }}
          >
            {items.map(({ id, img, title, text, url }) => (
              <article key={id} className={styles.slide}>
                <div className={styles.card}>
                  <img src={img} alt={title} className={styles.cardImg} />

                  <div className={styles.cardBody}>
                    <h5 style={{ margin: '0 0 0.75rem' }}>{title}</h5>
                    <p style={{ fontSize: '0.9rem', opacity: 0.85 }}>{text}</p>
                  </div>

                  <div
                    style={{
                      paddingBottom: '1.25rem',
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                  >
                    <Button
                      as="a"
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="primary"
                    >
                      View ↗
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* controles */}
          <Button
            onClick={prev}
            variant="secondary"
            iconOnly
            aria-label="Previous item"
            className={`${styles.controls} ${styles.controlsLeft}`}
          >
            ‹
          </Button>
          <Button
            onClick={next}
            variant="secondary"
            iconOnly
            aria-label="Next item"
            className={`${styles.controls} ${styles.controlsRight}`}
          >
            ›
          </Button>
        </div>
      </div>
    </section>
  );
}

export default PortfolioSection;
