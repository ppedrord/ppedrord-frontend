import React from 'react';
import styles from './Header.module.css'; 
import DarkModeToggle from '../common/DarkModeToggle/DarkModeToggle';
import { useTheme } from '../../contexts/ThemeContext';

import logoBlack from './icons/pb-logo-black.svg';
import logoWhite from './icons/pb-logo-white.png';

function Header() {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  const currentLogo = isDarkMode ? logoWhite : logoBlack;

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <a href="#" className={styles.logoLink}>
          <img
            src={currentLogo}
            alt="Logo ppedrord"
            itemType="image/svg+xml"
            className={styles.logo}
          />
        </a>
        <nav className={styles.nav}>
          <ul>
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#portfolio">Portfolio</a>
            </li>
            <li>
              <a href="#contact">Contact Me</a>
            </li>
          </ul>
        </nav>
        <DarkModeToggle />
      </div>
    </header>
  );
}

export default Header;
