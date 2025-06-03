import React from 'react';
import Header from '../Header/Header'; // Ajuste o caminho se necessário
import Footer from '../Footer/Footer'; // Ajuste o caminho se necessário
import Sidebar from '../Sidebar/Sidebar'; // Ajuste o caminho se necessário
// import styles from './MainLayout.module.css'; // Crie este se precisar de estilos específicos

/**
 * Componente MainLayout
 * Envolve as páginas com Header, Footer e um Sidebar condicional.
 * @param {object} props
 * @param {React.ReactNode} props.children - O conteúdo da página a ser renderizado.
 * @param {Array|null} [props.sidebarNavItems=null] - Itens de navegação para o Sidebar.
 * @param {string} props.pageId - Um ID para o elemento <main>, útil para targeting ou testes.
 */
function MainLayout({ children, sidebarNavItems, pageId }) {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Determina se o botão burger deve ser mostrado (se houver itens no sidebar e eles não forem um array vazio)
  const showBurgerForPage = Array.isArray(sidebarNavItems) && sidebarNavItems.length > 0;

  return (
    <div className="app-wrapper"> {/* Pode usar styles.appWrapper se criar o .module.css */}
      <Header
        onToggleSidebar={toggleSidebar}
        isSidebarOpen={isSidebarOpen}
        showBurger={showBurgerForPage}
      />
      {showBurgerForPage && ( // Renderiza o Sidebar apenas se houver itens e o burger for mostrado
        <Sidebar
          isOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
          navItems={sidebarNavItems}
          // currentPagePath é melhor gerenciado pelo Sidebar usando useLocation
        />
      )}
      <main 
        id={pageId || 'main-content'} 
        style={{ paddingTop: 'var(--header-h, 4rem)' }} // Padding para compensar o header fixo
        // className={styles.mainContainer} // Exemplo se usar MainLayout.module.css
      >
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;
