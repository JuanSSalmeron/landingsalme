import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';  // <-- Importa BrowserRouter
import './index.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>  {/* <-- Envuelve aquí */}
      <App />
    </BrowserRouter>
  </StrictMode>,
);
