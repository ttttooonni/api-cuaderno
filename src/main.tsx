import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

function App() {
  return (
    <main className="app">
      <header className="hero">
        <p className="eyebrow">API-CUADERNO</p>
        <h1>Tu cuaderno de campo.</h1>
        <p>Una base segura para registrar apiarios, colmenas, sanidad, producción y tareas.</p>
      </header>

      <section className="notice" role="status" aria-live="polite">
        <strong>Proyecto inicializado</strong>
        <span>La aplicación se construirá por etapas con migraciones y copias de seguridad.</span>
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
