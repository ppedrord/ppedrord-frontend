import React, { useState } from 'react';
import styles from './Header.module.css';

import { useTheme } from '../../contexts/ThemeContext';
import DarkModeToggle from '../common/DarkModeToggle/DarkModeToggle';

import logoBlack from './icons/pb-logo-black.svg';
import logoWhite from './icons/pb-logo-white.png';

function Header() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [mobileOpen, setMobileOpen] = useState(false);

  const currentLogo = isDark ? logoWhite : logoBlack;

  return (
    <header className={styles.header} data-dark={isDark}>
      <div className={styles.container}>
        {/* ---------- Logo ---------- */}
        <a href="#home" className={styles.logoLink}>
          <img src={currentLogo} alt="PB logo" className={styles.logo} />
        </a>

        {/* ---------- Navegação desktop ---------- */}
        <nav className={styles.navDesktop}>
          <a href="#about">About&nbsp;me</a>
          <a href="#skills">Skills</a>
          <a href="#portfolio">Portfolio</a>
          {/* <a href="#contact" className={styles.contactBtn}>
            Contact&nbsp;me
          </a> */}
          <a href="#contact">
            Contact&nbsp;me
          </a>
        </nav>

        {/* ---------- Tema & menu mobile ---------- */}
        <div className={styles.actions}>
          <DarkModeToggle />
          <button
            aria-label="Open menu"
            className={styles.burger}
            onClick={() => setMobileOpen((v) => !v)}
          >
            <span />
          </button>
        </div>
      </div>

      {/* ---------- Navegação mobile ---------- */}
      {mobileOpen && (
        <nav className={styles.navMobile}>
          <a onClick={() => setMobileOpen(false)} href="#about">
            About me
          </a>
          <a onClick={() => setMobileOpen(false)} href="#skills">
            Skills
          </a>
          <a onClick={() => setMobileOpen(false)} href="#portfolio">
            Portfolio
          </a>
          <a
            onClick={() => setMobileOpen(false)}
            href="#contact"
            className={styles.contactBtn}
          >
            Contact me
          </a>
        </nav>
      )}
    </header>
  );
}

export default Header;
