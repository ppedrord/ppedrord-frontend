import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'; // Importar hooks do React Router
import styles from './Sidebar.module.css';

function Sidebar({ isOpen, toggleSidebar, navItems }) {
  const location = useLocation(); // Hook para obter a localização atual
  const navigate = useNavigate(); // Hook para navegação programática

  // Não renderiza nada se não estiver aberto
  if (!isOpen) {
    return null;
  }

  const handleLinkClick = (e, itemHref) => {
    e.preventDefault(); // Previne o comportamento padrão do link para todos os casos inicialmente

    const isSamePageAnchor = itemHref.startsWith("#") || 
                             (itemHref.startsWith(location.pathname + "#") && location.pathname !== "/");
    const isHomePageAnchor = itemHref.startsWith("/#") && location.pathname === "/";


    if (isSamePageAnchor || isHomePageAnchor) {
      // Lógica para scroll suave para âncoras na mesma página ou na home a partir da home
      let targetId;
      if (isHomePageAnchor) { // Ex: Clicou em "/#about" estando em "/"
        targetId = itemHref.substring(2); // Remove "/#"
      } else if (itemHref.startsWith(location.pathname + "#")) { // Ex: Clicou em "/deploy-guide#overview" estando em "/deploy-guide"
        targetId = itemHref.substring(location.pathname.length + 1); // Remove "/path#"
      } else { // Ex: Clicou em "#overview" estando em "/deploy-guide"
         targetId = itemHref.substring(1); // Remove "#"
      }
      
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        const headerOffset = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-h').replace('rem', '')) * 16 || 64; // Converte rem para px
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    } else {
      // Navegação para outra página (usando React Router)
      navigate(itemHref);
    }
    toggleSidebar(); // Fecha o sidebar após o clique
  };

  return (
    <>
      {/* Aplica a classe .overlayVisible quando isOpen é true */}
      <div 
        className={`${styles.overlay} ${isOpen ? styles.overlayVisible : ''}`} 
        onClick={toggleSidebar} 
        aria-hidden="true" 
      />
      <aside className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ''}`}>
        <div className={styles.sidebarHeader}>
          <h2 className={styles.sidebarTitle}>Navegação</h2>
          <button
            type="button" // Boa prática para botões não-submit
            onClick={toggleSidebar}
            className={styles.closeButton}
            aria-label="Fechar menu"
          >
            &times; {/* Ícone de fechar simples */}
          </button>
        </div>
        <nav className={styles.nav}>
          <ul>
            {navItems && navItems.map((item) => {
              // Determina se o link está ativo
              // Para âncoras na mesma página: location.hash deve corresponder ao href (ex: #about)
              // Para outras páginas: location.pathname deve corresponder ao href (ex: /articles)
              let isActive = false;
              if (item.href.startsWith("#") || item.href.startsWith(location.pathname + "#")) { // Âncora na página atual
                const anchor = item.href.includes("#") ? item.href.substring(item.href.indexOf("#")) : item.href;
                isActive = location.hash === anchor;
              } else if (item.href.startsWith("/#") && location.pathname === "/") { // Âncora na home, estando na home
                 isActive = location.hash === item.href.substring(1);
              }
              else { // Link para outra página
                isActive = location.pathname === item.href;
              }

              return (
                <li key={item.href}>
                  {/* Usamos <a> e onClick customizado para ter controle total sobre 
                    scroll para âncoras e navegação com React Router.
                    Poderia usar <Link> do react-router-dom para links de página e <a> para âncoras,
                    mas esta abordagem unifica a lógica de fechar o sidebar.
                  */}
                  <a
                    href={item.href} // href ainda é útil para acessibilidade e "abrir em nova aba"
                    className={`${styles.navLink} ${isActive ? styles.active : ''}`}
                    onClick={(e) => handleLinkClick(e, item.href)}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;
