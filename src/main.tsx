import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { ErrorBoundary } from './components/layout/ErrorBoundary'
import './index.css'

/* Apply the stored theme before first paint so there is no flash of the
   wrong colour scheme. */
try {
  const stored = localStorage.getItem('os-academy-theme')
  if (stored === 'light' || stored === 'dark') {
    document.documentElement.setAttribute('data-theme', stored)
  }
} catch {
  /* storage unavailable — the system preference applies */
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>,
)
