import React from 'react';
import styles from './Header.module.css';
import { useTheme } from '../../contexts/ThemeContext';
import DarkModeToggle from '../common/DarkModeToggle/DarkModeToggle';
import Button from '../common/Button';
import { LuMenu } from 'react-icons/lu';


function Header({ onToggleSidebar, showBurger = true }) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';


  const logoBlackPath = '/pb-logo-black.svg'; 
  const logoWhitePath = '/pb-logo-white.png'; 

  const currentLogo = isDark ? logoWhitePath : logoBlackPath;

  return (
    <header className={styles.header} data-dark={isDark ? 'true' : 'false'}>
      <div className={styles.container}>
        <a href="/" className={styles.logoLink} aria-label="Página Inicial">
          <img src={currentLogo} alt="PB logo" className={styles.logo} />
        </a>

        <nav className={styles.navDesktop}>
          <a href="/">Home</a>
          <a href="/articles">Artigos</a> 
          <a href="/#contact" className={styles.contactBtn}>
            {' '}
            {/* Exemplo: link para seção Contato na Home */}
            Contato
          </a>
        </nav>

        <div className={styles.actions}>
          <DarkModeToggle />
          {showBurger && (
            <Button
              onClick={onToggleSidebar}
              variant="secondary"
              iconOnly
              aria-label="Abrir menu lateral"
              className={styles.burger} 
            >
              <span ><LuMenu size={24} /></span>{' '}
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
