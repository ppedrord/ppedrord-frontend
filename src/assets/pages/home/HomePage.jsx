// src/pages/HomePage.jsx
import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';

import Hero from './sections/Hero';
import AboutSection from './sections/AboutSection';
import PortfolioSection from './sections/PortfolioSection';
import ContactSection from './sections/ContactSection';

function HomePage() {
  return (
    <>
      <Header />

      <main>
        <Hero />
        <AboutSection id="sobre" />
        <PortfolioSection id="portfolio" />
        <ContactSection id="contato" />
      </main>

      <Footer />
    </>
  );
}

export default HomePage;
