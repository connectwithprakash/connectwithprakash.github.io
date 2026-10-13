import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const root = document.getElementById('root');
const snapshot = document.getElementById('prerender-content');

// Keep the static page visible while lazy chunks and local document content load.
if (snapshot) {
  const observer = new MutationObserver(() => {
    if (!root.querySelector('#page-content h1, #page-content h2') ||
      root.querySelector('.route-loading, .resume-loading')) return;
    snapshot.remove();
    document.getElementById('prerender-handoff')?.remove();
    observer.disconnect();
  });
  observer.observe(root, { childList: true, subtree: true });
}

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
