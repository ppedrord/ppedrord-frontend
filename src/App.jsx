

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '../src/assets/contexts/ThemeContext';

// Importe suas páginas
import HomePage from './assets/pages/home/HomePage.jsx';
import ArticlesPage from './assets/pages/articles/ArticlesPage.jsx';

import DeployGuidePage from './assets/pages/articles/deploy-guide/DeployGuidePage.jsx';

// Importe componentes de layout globais
import Header from './assets/components/layout/Header';
import Footer from './assets/components/layout/Footer';
import Sidebar from './assets/components/layout/Sidebar'; 

// Importe estilos globais
import './assets/style/global.css';
import './assets/style/theme.css';

// Layout principal que inclui Header, Footer e um Sidebar opcional
const MainLayout = ({ children, sidebarNavItems, pageId }) => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const [currentPath, setCurrentPath] = React.useState(window.location.pathname + window.location.hash);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  React.useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname + window.location.hash);
    };
    // Ouve mudanças de hash para atualizar o sidebar (para links de âncora)
    window.addEventListener('hashchange', handleLocationChange);
    // Atualiza no mount e quando o pathname muda (para navegação entre páginas)
    handleLocationChange(); 
    
    return () => {
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, [window.location.pathname, window.location.hash]);


  // Determina se o burger deve ser mostrado (se houver itens no sidebar)
  const showBurgerForPage = Array.isArray(sidebarNavItems) && sidebarNavItems.length > 0;

  return (
    <div className="app-wrapper">
      <Header onToggleSidebar={toggleSidebar} showBurger={showBurgerForPage} />
      {showBurgerForPage && (
        <Sidebar
          isOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
          navItems={sidebarNavItems}
          currentPagePath={currentPath} // Passa o path completo (com hash)
        />
      )}
      <main id={`page-${pageId}`} style={{paddingTop: 'var(--header-h, 4rem)'}}> {/* Adiciona padding para o header fixo */}
        {children}
      </main>
    </div>
  );
};


function App() {
  // Definição dos itens de navegação para cada página que usa sidebar
  const homePageNavItems = [
    { href: '/#start', label: 'Start' }, // Use /# para indicar a raiz e a âncora
    { href: '/#about', label: 'About me' },
    { href: '/#portfolio', label: 'Portfolio' },
    { href: '/#contact', label: 'Contact' },
  ];

  const articlesData = [ // Simulação dos seus dados de artigos
    { id: 'deploy-guide-cdk', title: 'Guia de Automação de Deploy CDK Multi-Conta', slug: '/articles/deploy-guide-cdk' },
  ];

  const articlesPageNavItems = articlesData.map(article => ({
    href: article.slug,
    label: article.title,
  }));
  
  // Para DeployGuidePage, os navItems são definidos dentro do próprio componente
  // Se quiser centralizar, defina aqui também.
  const deployGuidePageNavItems = [
    { href: '/deploy-guide#overview', label: 'Visão Geral' },
    { href: '/deploy-guide#comparison', label: 'Comparativo' },
    { href: '/deploy-guide#architecture', label: 'Arquitetura' },
    { href: '/deploy-guide#implementation', label: 'Implementação' },
    { href: '/deploy-guide#flow', label: 'Fluxo de Deploy' },
    { href: '/deploy-guide#security', label: 'Segurança' },
  ];


  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route 
            path="/" 
            element={
              <MainLayout sidebarNavItems={homePageNavItems} pageId="home">
                <HomePage />
              </MainLayout>
            } 
          />
          <Route 
            path="/articles" 
            element={
              <MainLayout sidebarNavItems={articlesPageNavItems} pageId="articles-list">
                <ArticlesPage />
              </MainLayout>
            } 
          />
          {/* Rota para um artigo específico (exemplo) */}
          <Route 
            path="/articles/deploy-guide-cdk" 
            element={
              <MainLayout sidebarNavItems={deployGuidePageNavItems} pageId="deploy-guide-article">
                <DeployGuidePage /> 
              </MainLayout>
            }
          />
          {/* Adicione outras rotas de artigos aqui, ou uma rota dinâmica como /articles/:slug */}
          
          {/* Rota para a página de guia de deploy (se for separada da lista de artigos) */}
          <Route 
            path="/deploy-guide" 
            element={
              <MainLayout sidebarNavItems={deployGuidePageNavItems} pageId="deploy-guide-standalone">
                <DeployGuidePage />
              </MainLayout>
            } 
          />

          {/* Rota para redirecionar caso não encontre (opcional) */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
