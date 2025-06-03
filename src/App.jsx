import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';

// Layout Principal
import MainLayout from './components/layout/MainLayout/MainLayout';

// Páginas
import HomePage from './pages/HomePage';
import ArticlesPage from './pages/ArticlesPage';
import DeployGuidePage from './pages/DeployGuidePage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';

// Navegação
import {
  homePageNavItems,
  articlesPageSidebarNavItems,
  articlesDataForNav,
  deployGuidePageNavItems,
} from './config/navigation';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <MainLayout sidebarNavItems={homePageNavItems} pageId="home-page">
                <HomePage />
              </MainLayout>
            }
          />
          <Route
            path="/articles"
            element={
              <MainLayout
                sidebarNavItems={articlesPageSidebarNavItems}
                pageId="articles-list-page"
              >
                <ArticlesPage />
              </MainLayout>
            }
          />
          {/* Rota para um artigo específico (exemplo, usando DeployGuidePage como detalhe do artigo) */}
          <Route
            path="/articles/deploy-guide-cdk"
            element={
              <MainLayout
                sidebarNavItems={deployGuidePageNavItems}
                pageId="deploy-guide-article-page"
              >
                <DeployGuidePage />
              </MainLayout>
            }
          />
          <Route
            path="/contact"
            element={
              // ContactPage pode não ter um sidebar de navegação interna
              <MainLayout sidebarNavItems={null} pageId="contact-page">
                <ContactPage />
              </MainLayout>
            }
          />
          <Route
            path="/deploy-guide" // Se for uma página independente também
            element={
              <MainLayout
                sidebarNavItems={deployGuidePageNavItems}
                pageId="deploy-guide-standalone-page"
              >
                <DeployGuidePage />
              </MainLayout>
            }
          />
          <Route
            path="*"
            element={
              <MainLayout sidebarNavItems={null} pageId="not-found-page">
                <NotFoundPage />
              </MainLayout>
            }
          />
          {/* Ou, se preferir redirecionar para a home em caso de 404: */}
          {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
