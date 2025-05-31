import React from 'react';
import styles from './Hero.module.css';

import SocialIcon from '../../../components/common/SocialIcon'; // ícone reutilizável
import heroPhoto from '../../../images/hero-image.png';

function Hero() {
  return (
    <section id="home" className={styles.hero}>
      {/* ----- Lado esquerdo ------------------------------------------------ */}
      <div className={styles.columnLeft}>
        <p className={styles.greeting}>Hi, I am</p>
        <h1 className={styles.name}>Pedro Barbosa</h1>
        <p className={styles.role}>Back-End Developer / AWS</p>

        <div className={styles.social}>
          <SocialIcon icon="instagram" href="https://instagram.com/ppedrord" label="Instagram" />
          <SocialIcon icon="github"    href="https://github.com/ppedrord"   label="GitHub"    />
          <SocialIcon icon="linkedin"  href="https://linkedin.com/in/ppedrord" label="LinkedIn" />
        </div>
      </div>

      {/* ----- Lado direito ------------------------------------------------- */}
      <div className={styles.columnRight}>
        <img
          src={heroPhoto}
          alt="Pedro Barbosa profile"
          className={styles.photo}
          loading="lazy"
        />
      </div>
    </section>
  );
}

export default Hero;
