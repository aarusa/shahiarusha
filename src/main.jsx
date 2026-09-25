import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import App from './App.jsx'
import './styles/base.css'
import './styles/components.css'
import './styles/pages.css'

const base = import.meta.env.BASE_URL
const basename = !base || base === '/' || base === './' ? undefined : base.replace(/\/$/, '')
const file = window.location.protocol === 'file:'
const Router = file ? HashRouter : BrowserRouter

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router basename={file ? undefined : basename}>
      <App />
    </Router>
  </StrictMode>,
)
