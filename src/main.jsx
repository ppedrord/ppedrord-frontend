// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';

// Importar pesos da fonte Roboto
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

// Importar estilos globais e variáveis CSS
import '@styles/variables.css'; 
import '@styles/global.css';  

import App from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
