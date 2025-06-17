// src/components/layout/Footer/Footer.jsx
import React from 'react';

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
 * Componente Footer da aplicação.
 * Exibe informações de copyright e links úteis.
 * @returns {JSX.Element} O componente Footer.
 */
const FooterContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
  color: theme.palette.text.secondary,
  padding: theme.spacing(3, 2), // padding vertical e horizontal
  marginTop: 'auto', // Empurra o footer para o final da página quando o conteúdo é curto
  textAlign: 'center',
  borderTop: `1px solid ${theme.palette.divider}`,
}));

const FooterText = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(1),
}));

const FooterLink = styled(Link)(({ theme }) => ({
  margin: theme.spacing(0, 1), // margem horizontal
}));

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer component="footer">
      <Container maxWidth="lg">
        <FooterText variant="body2">
          &copy; {currentYear} Quantum Innovations LTDA. Todos os direitos reservados.
        </FooterText>
        <Box>
          {/* Adicione links relevantes aqui */}
          <FooterLink href="#" color="inherit">
            Política de Privacidade
          </FooterLink>
          {' | '}
          <FooterLink href="#" color="inherit">
            Termos de Uso
          </FooterLink>
        </Box>
      </Container>
    </FooterContainer>
  );
};

export default Footer;
