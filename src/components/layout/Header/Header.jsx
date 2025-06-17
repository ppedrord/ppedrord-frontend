// src/components/layout/Header/Header.jsx
import React from 'react';
import DarkModeToggle from '@/components/common/DarkModeToggle'; // Usando alias

// Importando os componentes necessários do MUI
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

// Importe outros componentes do MUI ou ícones que você possa precisar
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

/**
 * @typedef {Object} HeaderProps
 * @property {Function} [onDrawerToggle] - Função para lidar com o toggle do drawer em mobile (se aplicável).
 */

/**
 * Componente Header da aplicação.
 * Exibe o logo/título da aplicação e links de navegação principais.
 * Utiliza AppBar e Toolbar do MUI para uma estrutura padrão.
 *
 * @param {HeaderProps} props - As props do componente.
 * @returns {JSX.Element} O componente Header.
 */
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  // Você pode adicionar estilos customizados para o AppBar aqui se necessário,
  // ou usar a prop `sx` diretamente na instância.
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[1],
  // boxShadow: theme.shadows[1],
  // backgroundColor:
  //   theme.palette.mode === 'light'
  //     ? theme.palette.grey[200]
  //     : theme.palette.grey[800],
  // color: theme.palette.text.secondary,
}));



const LogoTypography = styled(Typography)(({ theme }) => ({
  flexGrow: 1,
  fontWeight: 'bold',
  textDecoration: 'none',
  color: 'inherit',
  '&:hover': {
    color: theme.palette.secondary.main,
  },
}));

const NavLinkButton = styled(Button)(({ theme }) => ({
  marginLeft: theme.spacing(2),
  color: 'inherit',
}));

const Header = () => {
  return (
    <StyledAppBar position="static">
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <LogoTypography
            variant="h6"
            component="a"
            href="/"
            sx={{ textDecoration: 'none', color: 'inherit' }}
          >
            ppedrord
          </LogoTypography>

          <Box sx={{ display: { xs: 'none', sm: 'flex' }, ml: 'auto' }}>
            {' '}
            <NavLinkButton component="a" href="/">
              Home
            </NavLinkButton>
            <NavLinkButton component="a" href="/artigos">
              Artigos
            </NavLinkButton>
            <NavLinkButton component="a" href="/portfolio">
              Portfólio
            </NavLinkButton>
            <NavLinkButton component="a" href="/contato">
              Contato
            </NavLinkButton>
          </Box>
          <DarkModeToggle />
          {/* Adicionar aqui o LanguageSelector na próxima etapa */}
        </Toolbar>
      </Container>
    </StyledAppBar>
  );
};

export default Header;
