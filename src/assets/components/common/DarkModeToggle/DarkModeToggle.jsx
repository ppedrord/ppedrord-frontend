import React from 'react';
import Button from '../Button';
import { LuMoonStar as Moon} from "react-icons/lu";import { MdSunny as Sun} from "react-icons/md";
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
