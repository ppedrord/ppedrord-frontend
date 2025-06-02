import React, { useState, useEffect } from 'react';
import Header from '../../components/layout/Header'; // Ajuste o caminho
import Footer from '../../components/layout/Footer'; // Ajuste o caminho
import Sidebar from '../../components/layout/Sidebar'; // Nosso novo Sidebar

import Hero from './sections/Hero';
import AboutSection from './sections/AboutSection';
import PortfolioSection from './sections/PortfolioSection';
import ContactSection from './sections/ContactSection';

// Defina os itens de navegação para o Sidebar da HomePage
const homePageNavItems = [
  { href: '#start', label: 'Start' },
  { href: '#about', label: 'About me' },
  { href: '#portfolio', label: 'Portfolio' },
  { href: '#contact', label: 'Contact' },
];

function HomePage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState('');

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Atualiza o caminho atual para o link ativo no sidebar (para âncoras)
  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPath(window.location.hash || '#start'); // # como padrão se não houver hash
    };

    handleHashChange(); // Define o estado inicial
    window.addEventListener('hashchange', handleHashChange, false);

    // Observer para seções visíveis (alternativa para destacar link ativo)
    const sections = homePageNavItems.map((item) =>
      document.querySelector(item.href)
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Verifica se o topo da seção está visível ou próximo do topo da viewport
            if (
              entry.boundingClientRect.top <= window.innerHeight / 2 &&
              entry.boundingClientRect.bottom >= window.innerHeight / 2
            ) {
              setCurrentPath(`#${entry.target.id}`);
            } else if (
              entry.target.id === 'start' &&
              entry.boundingClientRect.top >= 0
            ) {
              // Caso especial para a seção Hero no topo
              setCurrentPath('#start');
            }
          }
        });
      },
      { threshold: 0.1, rootMargin: '-50% 0px -50% 0px' }
    ); // Ajuste o rootMargin para quando considerar "ativo"

    sections.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      sections.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  return (
    <>
      {/* Passa a função de toggle para o Header */}
      <Header onToggleSidebar={toggleSidebar} showBurger={true} />

      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        navItems={homePageNavItems}
        currentPagePath={currentPath}
      />

      <main>
        {' '}
        {/* O padding-top para compensar o Header fixo deve estar no CSS global ou do mainContent da página */}
        <Hero id="start" />{' '}
        {/* id="home" no Header.jsx aponta para a raiz, Hero tem id="start" */}
        <AboutSection id="about" />
        <PortfolioSection id="portfolio" />
        <ContactSection id="contact" />
      </main>
      <Footer></Footer>
    </>
  );
}

export default HomePage;
