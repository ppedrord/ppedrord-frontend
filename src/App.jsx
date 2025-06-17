// src/App.jsx (Atualização)
// Envolver a aplicação com AppThemeProvider
import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppThemeProvider from '@/contexts/ThemeContext';
import MainLayout from '@/components/layout/MainLayout'; // Exemplo, você integrará o Router aqui
import Typography from '@mui/material/Typography';

// Exemplo de página
const HomePage = () => (
  <Typography variant="h4" component="h1" gutterBottom>
    Bem-vindo à Home Page!
  </Typography>
);

function App() {
  return (
    <AppThemeProvider>
      <CssBaseline />{' '}
      {/* CssBaseline deve vir dentro do AppThemeProvider para usar o tema */}
      {/* O RouterProvider do React Router virá aqui eventualmente */}
      <MainLayout>
        {/* As rotas serão renderizadas aqui como children do MainLayout */}
        <HomePage />{' '}
        {/* Exemplo simples, será substituído por <Outlet /> do router */}
      </MainLayout>
    </AppThemeProvider>
  );
}

export default App;
