import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { email } from './data/contact'
import './index.css'

// Easter egg para quem abrir o DevTools
console.log(
  '%cERIK_PINHEIRO.EXE%c\nAchou o console. Tente o Konami Code no desktop. Contato: ' + email,
  'font: 700 14px monospace; color: #000; background: #fff; padding: 4px 8px;',
  'font: 12px monospace; color: #ff6a1a;',
)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
