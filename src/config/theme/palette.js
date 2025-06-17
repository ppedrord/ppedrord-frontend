// src/config/theme/palette.js

// As paletas agora podem ser mais simples, pois os valores virão das variáveis CSS
// ou podem ser construídas dinamicamente usando `var()`.
// Para máxima integração com `theme.palette.primary.main` etc. no MUI,
// ainda definimos a estrutura, mas os valores referenciam as variáveis CSS.

export const lightPalette = {
  mode: 'light',
  primary: {
    main: 'var(--color-primary-main)',
    light: 'var(--color-primary-light)',
    dark: 'var(--color-primary-dark)',
    contrastText: 'var(--color-primary-contrast-text)',
  },
  secondary: {
    main: 'var(--color-secondary-main)',
    light: 'var(--color-secondary-light)',
    dark: 'var(--color-secondary-dark)',
    contrastText: 'var(--color-secondary-contrast-text)',
  },
  error: { main: 'var(--color-error-main)' },
  warning: { main: 'var(--color-warning-main)' },
  info: { main: 'var(--color-info-main)' },
  success: { main: 'var(--color-success-main)' },
  background: {
    default: 'var(--color-background-default)',
    paper: 'var(--color-background-paper)',
  },
  text: {
    primary: 'var(--color-text-primary)',
    secondary: 'var(--color-text-secondary)',
    disabled: 'var(--color-text-disabled)',
  },
  divider: 'var(--color-divider)',
};

export const darkPalette = {
  mode: 'dark',
  // As mesmas chaves, mas o seletor [data-theme="dark"] no CSS já aplicará os valores corretos.
  // O MUI usará essas chaves para construir seu objeto de paleta.
  primary: {
    main: 'var(--color-primary-main)',
    light: 'var(--color-primary-light)',
    dark: 'var(--color-primary-dark)',
    contrastText: 'var(--color-primary-contrast-text)',
  },
  secondary: {
    main: 'var(--color-secondary-main)',
    light: 'var(--color-secondary-light)',
    dark: 'var(--color-secondary-dark)',
    contrastText: 'var(--color-secondary-contrast-text)',
  },
  error: { main: 'var(--color-error-main)' },
  warning: { main: 'var(--color-warning-main)' },
  info: { main: 'var(--color-info-main)' },
  success: { main: 'var(--color-success-main)' },
  background: {
    default: 'var(--color-background-default)',
    paper: 'var(--color-background-paper)',
  },
  text: {
    primary: 'var(--color-text-primary)',
    secondary: 'var(--color-text-secondary)',
    disabled: 'var(--color-text-disabled)',
  },
  divider: 'var(--color-divider)',
};
