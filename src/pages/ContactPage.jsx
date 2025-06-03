import React, { useState, useEffect } from 'react';


function ContactPage() {
  return (
    <div
      style={{
        padding: '2rem',
        textAlign: 'center',
        minHeight:
          'calc(100vh - var(--header-h, 4rem) - var(--footer-h, 0rem))',
      }}
    >
      <h2>Entre em Contato</h2>
      <p>Aqui você pode adicionar seu formulário de contato ou informações.</p>
    </div>
  );
}

export default ContactPage;
