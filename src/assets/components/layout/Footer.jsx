import React from 'react';
import styles from './Footer.module.css';

import SocialIcon from '../common/SocialIcon';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p>
          &copy; {currentYear} Quantum Innovations LTDA. All rights reserved.
        </p>
        <div className={styles.socialLinks}>
          <div className={styles.social}>
            <SocialIcon
              icon="instagram"
              href="https://instagram.com/ppedrord"
              label="Instagram"
            />
            <SocialIcon
              icon="github"
              href="https://github.com/ppedrord"
              label="GitHub"
            />
            <SocialIcon
              icon="linkedin"
              href="https://linkedin.com/in/ppedrord"
              label="LinkedIn"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
