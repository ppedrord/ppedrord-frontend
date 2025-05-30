import React from 'react';
import Button from '../Button';
import Moon from './icons/moon_stars.svg?react';
import Sun from './icons/sun.svg?react';
import styles from './DarkModeToggle.module.css';
import { useTheme } from '../../../contexts/ThemeContext';

function DarkModeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <Button
      onClick={toggleTheme}
      variant="secondary"
      iconOnly
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={styles.toggle}
    >
      <Sun
        className={`${styles.icon} ${styles.sun}  ${!isDark ? styles.visible : ''}`}
      />
      <Moon
        className={`${styles.icon} ${styles.moon} ${isDark ? styles.visible : ''}`}
      />
    </Button>
  );
}

export default DarkModeToggle;
