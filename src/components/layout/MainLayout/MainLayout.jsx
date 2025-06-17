
// src/components/layout/MainLayout/MainLayout.jsx
import React from 'react';
import PropTypes from 'prop-types';

// Importando o Header e Footer
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// Importando os componentes necessários do MUI
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

/**
 * @typedef {Object} MainLayoutProps
 * @property {React.ReactNode} children - O conteúdo da página a ser renderizado dentro do layout.
 */

/**
 * Componente MainLayout.
 * Serve como o layout principal para a maioria das páginas da aplicação,
 * incluindo Header, Footer e a área de conteúdo principal.
 *
 * @param {MainLayoutProps} props - As props do componente.
 * @returns {JSX.Element} O componente MainLayout.
 */
const SiteContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh', // Garante que o layout ocupe pelo menos toda a altura da viewport
  backgroundColor: theme.palette.background.default, // Cor de fundo base do tema
}));

const ContentContainer = styled(Container)(({ theme }) => ({ // Usando Container do MUI para o conteúdo principal
  flexGrow: 1, // Faz com que o conteúdo principal ocupe o espaço vertical disponível
  paddingTop: theme.spacing(3), // Espaçamento no topo do conteúdo
  paddingBottom: theme.spacing(3), // Espaçamento na base do conteúdo
  [theme.breakpoints.up('sm')]: { // Em telas sm e maiores
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

const MainLayout = ({ children }) => {
  return (
    <SiteContainer>
      <Header /> {/* Header definido acima */}
      <ContentContainer component="main" maxWidth="lg"> {/* maxWidth="lg" é um bom padrão */}
        {children}
      </ContentContainer>
      <Footer /> {/* Footer definido acima */}
    </SiteContainer>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainLayout; // Exporta MainLayout como default para este "arquivo" combinado
