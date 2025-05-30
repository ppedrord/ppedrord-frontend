import React from 'react';
import styles from './Hero.module.css';
import Button from '../../../components/common/Button';

import heroImage from '../../../images/hero-image.png';

function Hero() {
  return (
    <section id="inicio" className={styles.hero}>
      <div className={styles.content}>
        <h1 className={styles.title}>Desenvolvimento e Liderança</h1>
        <p className={styles.subtitle}>
          Criando experiências digitais incríveis com aquilo que há de melhor.
        </p>
        <Button
          onClick={() => document.getElementById('contato')?.scrollIntoView()}
        >
          Entre em Contato
        </Button>
      </div>
      <div className={styles.imageContainer}>
        {/* Lazy loading será implementado depois, por enquanto, img padrão */}
        <img
          src={heroImage}
          alt="Profile"
          className={styles.image}
        />
      </div>
    </section>
  );
}

export default Hero;
