// src/config/theme/index.js (AJUSTADO SIGNIFICATIVAMENTE)
// Arquivo principal para criar e exportar as opções de tema MUI.
// Agora ele lê os valores das variáveis CSS.
import { typographyOptions } from './typography';

/**
 * Função auxiliar para obter o valor de uma variável CSS do elemento root.
 * @param {string} varName - O nome da variável CSS (ex: '--color-primary-main').
 * @returns {string} O valor da variável CSS ou uma string vazia se não encontrada.
 */
const getCssVar = (varName) => {
  if (typeof window !== 'undefined') {
    // Garante que estamos no ambiente do navegador antes de acessar document
    return getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
  }
  return ''; // Retorna um fallback ou lida com o SSR se necessário
};

/**
 * Retorna as opções de tema para um dado modo (light ou dark).
 * Estas opções serão usadas com 'createTheme' do MUI no ThemeContext.jsx.
 * @param {'light' | 'dark'} mode - O modo de cor desejado.
 * @returns {import('@mui/material/styles').ThemeOptions} As opções de tema.
 */
export const getDesignTokens = (mode) => {
  // A lógica para alternar os nomes das variáveis CSS já está em variables.css
  // via :root e body[data-theme="dark"]. Aqui, apenas lemos os nomes base.
  // O `mode` vindo do context já terá aplicado o `data-theme` no body,
  // então `getCssVar` pegará os valores corretos.

  return {
    palette: {
      mode, // 'light' ou 'dark'
      primary: {
        main: getCssVar('--color-primary-main'),
        light: getCssVar('--color-primary-light'),
        dark: getCssVar('--color-primary-dark'),
        contrastText: getCssVar('--color-primary-contrast-text'),
      },
      secondary: {
        main: getCssVar('--color-secondary-main'),
        light: getCssVar('--color-secondary-light'),
        dark: getCssVar('--color-secondary-dark'),
        contrastText: getCssVar('--color-secondary-contrast-text'),
      },
      error: { main: getCssVar('--color-error-main') },
      warning: { main: getCssVar('--color-warning-main') },
      info: { main: getCssVar('--color-info-main') },
      success: { main: getCssVar('--color-success-main') },
      background: {
        default: getCssVar('--color-background-default'),
        paper: getCssVar('--color-background-paper'),
      },
      text: {
        primary: getCssVar('--color-text-primary'),
        secondary: getCssVar('--color-text-secondary'),
        disabled: getCssVar('--color-text-disabled'),
      },
      divider: getCssVar('--color-divider'),
      // action: { // Você também pode definir a seção action aqui lendo variáveis CSS
      //   active: getCssVar('--color-action-active'),
      //   hover: getCssVar('--color-action-hover'),
      // },
    },
    typography: typographyOptions(), // typographyOptions pode usar var() ou também getCssVar internamente
    spacing: (factor) => `${factor * parseFloat(getCssVar('--spacing-unit') || '8')}px`, // Fallback para 8 se a var não estiver definida
    shape: {
      borderRadius: parseInt(getCssVar('--border-radius-base') || '4', 10), // Exemplo
    },
    // Adicione outras customizações de tema (breakpoints, shadows, components) aqui
    // components: {
    //   MuiButton: {
    //     styleOverrides: {
    //       root: {
    //         textTransform: 'none',
    //         // Você poderia até tentar usar variáveis CSS para alguns estilos de componentes aqui,
    //         // mas geralmente é mais seguro passar valores concretos para o objeto de tema.
    //         // boxShadow: getCssVar('--button-box-shadow'),
    //       },
    //     },
    //   },
    // },
  };
};