import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ClerkProvider } from '@clerk/clerk-react'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider publishableKey={"pk_test_c3dlZXQtZG9nZmlzaC0xOC5jbGVyay5hY2NvdW50cy5kZXYk"}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ClerkProvider>

  </StrictMode>,
)
