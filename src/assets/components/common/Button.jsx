import React from 'react';
import styles from './Button.module.css';

function Button({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  iconOnly = false,
  className = '',
  ...props
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${styles.button} ${styles[variant]} ${
        iconOnly ? styles.iconOnly : ''
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
