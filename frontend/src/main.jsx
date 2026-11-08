import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { FiltroProvider } from './context/FiltroContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FiltroProvider>
      <App />
    </FiltroProvider>
  </StrictMode>,
)
