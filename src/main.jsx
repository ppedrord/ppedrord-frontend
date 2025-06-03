// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider } from './contexts/ThemeContext'; 

import './style/global.css';
import './style/theme.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider> {/* ThemeProvider envolve App */}
      <App />
    </ThemeProvider>
  </React.StrictMode>
);