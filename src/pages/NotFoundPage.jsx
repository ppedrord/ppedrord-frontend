import React, { useState, useEffect } from 'react';

function NotFoundPage() {
  return (
    <div
      style={{
        padding: '2rem',
        textAlign: 'center',
        minHeight:
          'calc(100vh - var(--header-h, 4rem) - var(--footer-h, 0rem))',
      }}
    >
      <h2>404 - Página Não Encontrada</h2>
      <p>Oops! A página que você está procurando não existe.</p>
      <Link to="/">Voltar para Home</Link>
    </div>
  );
}

export default NotFoundPage;
