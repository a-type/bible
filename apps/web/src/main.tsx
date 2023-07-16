import 'virtual:uno.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App.js';

function main() {
  const root = createRoot(document.getElementById('root')!);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}

main();

function debugUno() {
  setTimeout(() => {
    navigator.clipboard.writeText(
      document.querySelector('[data-vite-dev-id="/__uno.css"]')?.textContent ??
        'failed to copy',
    );
    console.log('done');
  }, 3000);
}
(window as any).debugUno = debugUno;
