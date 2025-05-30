import { useState, useEffect } from 'react';

function useDarkMode() {
  // 1. Tenta ler do localStorage, senão usa preferência do sistema
  const [theme, setTheme] = useState(() => {
    const localTheme = window.localStorage.getItem('theme');
    if (localTheme) {
      return localTheme;
    }
    return window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  });

  // 2. Efeito para aplicar o tema ao body e salvar no localStorage
  useEffect(() => {
    const root = window.document.documentElement;
    root.setAttribute('data-theme', theme);
    window.localStorage.setItem('theme', theme);
  }, [theme]);

  // 3. Função para alternar o tema
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return [theme, toggleTheme];
}

export default useDarkMode;
