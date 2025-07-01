import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './styles/globals.css'
import { ColorProvider } from './contexts/ColorContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ColorProvider>
        <App />
      </ColorProvider>
    </BrowserRouter>
  </React.StrictMode>
)
