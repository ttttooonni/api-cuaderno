import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import { requestPersistentStorage } from './lib/data/db';

function App() {
  return (
    <main className="app">
      <header className="hero">
        <p className="eyebrow">API-CUADERNO</p>
        <h1>Tu cuaderno de campo.</h1>
        <p>Una base segura para registrar apiarios, colmenas, sanidad, producción y tareas.</p>
      </header>
      <section className="notice" role="status" aria-live="polite">
        <strong>API-CUADERNO está listo para crecer</strong>
        <span>Los cambios de estructura deberán pasar por migraciones. Tus datos no se sustituyen por un estado vacío.</span>
      </section>
    </main>
  );
}

void requestPersistentStorage();

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    void navigator.serviceWorker.register('./sw.js');
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
