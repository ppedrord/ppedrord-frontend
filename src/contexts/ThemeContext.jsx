// src/contexts/ThemeContext.jsx
import React, { createContext, useState, useMemo, useContext, useEffect } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
// Certifique-se que o alias @/config/theme está funcionando ou use o caminho relativo.
// Se estiver no mesmo épico, o alias pode não estar configurado ainda no jsconfig.json
// para o editor, mas o Vite deve resolver.
import { getDesignTokens } from '../config/theme'; // Ajuste o caminho se necessário

const AppThemeContext = createContext({
  toggleColorMode: () => {},
  mode: 'light',
});

// Hook customizado para acessar o contexto do tema.
export const useAppTheme = () => useContext(AppThemeContext); // Mantenha como exportação nomeada

// Componente Provedor como exportação padrão
const AppThemeProvider = ({ children }) => {
  const [mode, setMode] = useState(() => {
    try {
      const storedMode = localStorage.getItem('themeMode');
      return storedMode ? storedMode : 'light';
    } catch (error){
      console.error("Could not access localStorage for theme mode.", error);
      return 'light';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('themeMode', mode);
      document.body.setAttribute('data-theme', mode);
    } catch (error) {
      console.error("Could not set theme mode in localStorage.", error);
    }
  }, [mode]);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
      mode,
    }),
    [mode]
  );

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <AppThemeContext.Provider value={colorMode}>
      <MuiThemeProvider theme={theme}>
        {children}
      </MuiThemeProvider>
    </AppThemeContext.Provider>
  );
};

export default AppThemeProvider;