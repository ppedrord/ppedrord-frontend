// src/config/navigation.js

const homePageNavItems = [
  { href: '/#start', label: 'Start' },
  { href: '/#about', label: 'About me' },
  { href: '/#portfolio', label: 'Portfolio' },
  { href: '/#contact', label: 'Contact' },
];


const articlesDataForNav = [
  {
    id: 'deploy-guide-cdk',
    title: 'Guia de Automação de Deploy CDK Multi-Conta',
    slug: '/articles/deploy-guide-cdk', 
  },
];

const articlesPageSidebarNavItems = articlesDataForNav.map(article => ({
  href: article.slug,
  label: article.title,
}));

// Itens de navegação para o sidebar da DeployGuidePage
const deployGuidePageNavItems = [
  { href: '/deploy-guide#overview', label: 'Visão Geral' },
  { href: '/deploy-guide#comparison', label: 'Comparativo' },
  { href: '/deploy-guide#architecture', label: 'Arquitetura' },
  { href: '/deploy-guide#implementation', label: 'Implementação' },
  { href: '/deploy-guide#flow', label: 'Fluxo de Deploy' },
  { href: '/deploy-guide#security', label: 'Segurança' },
];

export {
  homePageNavItems,
  articlesPageSidebarNavItems,
  articlesDataForNav,
  deployGuidePageNavItems,
};