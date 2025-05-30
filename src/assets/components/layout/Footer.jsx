import React from 'react';
import styles from './Footer.module.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p>&copy; {currentYear} Quantum Innovations LTDA. All rights reserved.</p>
        <div className={styles.socialLinks}>
          {/* Adicione links/ícones para redes sociais aqui */}
          <a href="https://github.com/ppedrord" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/ppedrord" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
