import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import styles from './Header.module.css';
import { useTheme } from '../../../contexts/ThemeContext'; // Ajuste o caminho se necessário
import DarkModeToggle from '../../common/DarkModeToggle/DarkModeToggle'; // Ajuste o caminho
import Button from '../../common/Button/Button'; // Ajuste o caminho
import { LuMenu, LuX } from 'react-icons/lu'; // Importando LuMenu e LuX para o ícone do burger

/**
 * Componente Header
 * @param {object} props
 * @param {function} props.onToggleSidebar - Função para alternar a visibilidade do sidebar.
 * @param {boolean} [props.showBurger=true] - Controla a exibição do botão burger.
 * @param {boolean} [props.isSidebarOpen=false] - Indica se o sidebar está atualmente aberto, para alterar o ícone do burger.
 */
function Header({ onToggleSidebar, showBurger = true, isSidebarOpen = false }) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Caminhos dos logos (assumindo que estão na pasta public)
  // Se estiverem em src/assets, você precisaria importá-los:
  // import logoBlackSVG from '../../assets/images/pb-logo-black.svg';
  // import logoWhitePNG from '../../assets/images/pb-logo-white.png';
  const logoBlackPath = '/pb-logo-black.svg'; // Da sua pasta public
  const logoWhitePath = '/pb-logo-white.png'; // Da sua pasta public

  const currentLogo = isDark ? logoWhitePath : logoBlackPath;

  // Links de navegação principais para o desktop
  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/articles', label: 'Artigos' },
    // Assumindo que Contato é uma página e não uma seção da HomePage
    { path: '/contact', label: 'Contato' },
    // { path: "/deploy-guide", label: "Guia Deploy" } // Exemplo de outra página
  ];

  return (
    <header
      className={styles.header}
      data-dark={isDark ? 'true' : 'false'}
      data-sidebar-open={isSidebarOpen ? 'true' : 'false'} // Para estilizar o ícone do burger
    >
      <div className={styles.container}>
        <Link to="/" className={styles.logoLink} aria-label="Página Inicial">
          <img
            src={currentLogo}
            alt="Logo Pedro Barbosa"
            className={styles.logo}
          />
        </Link>

        <nav className={styles.navDesktop}>
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              // NavLink adiciona a classe 'active' por padrão.
              // O CSS em Header.module.css já estiliza .navItem.active
              className={styles.navItem}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className={styles.actions}>
          <DarkModeToggle />
          {showBurger && (
            <Button
              onClick={onToggleSidebar}
              variant="secondary" // Ou a variante que melhor se adequa do seu Button.jsx
              iconOnly
              aria-label={
                isSidebarOpen ? 'Fechar menu lateral' : 'Abrir menu lateral'
              }
              className={styles.burger}
              title={isSidebarOpen ? 'Fechar menu' : 'Abrir menu'}
            >
              {isSidebarOpen ? <LuX size={22} /> : <LuMenu size={22} />}
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
