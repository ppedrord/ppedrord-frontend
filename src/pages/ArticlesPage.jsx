import React, { useState, useEffect } from 'react';
import styles from './ArticlesPage.module.css';

const articles = [
  { id: 'deploy-guide-cdk', title: 'Guia de Automação de Deploy CDK Multi-Conta', slug: '/articles/deploy-guide-cdk', summary: 'Uma abordagem segura e eficiente com AWS CDK, GitHub Actions e GitFlow.' },
];

// Itens de navegação para o Sidebar da ArticlesPage (poderia ser dinâmico)
const articlesNavItems = articles.map(article => ({
  href: article.slug, 
  label: article.title,
}));


function ArticlesPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState(''); // Para destacar link ativo

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    // Em uma aplicação com React Router, você usaria useLocation() para pegar o pathname
    setCurrentPath(window.location.pathname); 

    // Se houver navegação interna na página de artigos (ex: seções de um artigo longo)
    // você adicionaria lógica similar à da HomePage para destacar âncoras.
  }, []);


  return (
    <>
      <main className={styles.mainContent}>
        <div className={styles.container}>
          <h1 className={styles.pageTitle}>Artigos</h1>
          {articles.length > 0 ? (
            <div className={styles.articlesGrid}>
              {articles.map(article => (
                <article key={article.id} className={styles.articleCard}>
                  <h2 className={styles.articleTitle}>
                    {/* Idealmente, este seria um <Link to={article.slug}> do React Router */}
                    <a href={article.slug}>{article.title}</a>
                  </h2>
                  <p className={styles.articleSummary}>{article.summary}</p>
                  <a href={article.slug} className={styles.readMoreLink}>
                    Ler mais &rarr;
                  </a>
                </article>
              ))}
            </div>
          ) : (
            <p>Nenhum artigo publicado ainda.</p>
          )}
        </div>
      </main>

    </>
  );
}

export default ArticlesPage;
