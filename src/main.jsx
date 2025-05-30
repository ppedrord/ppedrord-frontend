import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './assets/style/global.css';
import { ThemeProvider } from './assets/contexts/ThemeContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
