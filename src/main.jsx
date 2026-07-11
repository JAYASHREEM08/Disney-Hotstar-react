import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom' // Ensure this is installed
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* Add the basename here if you are using React Router */}
    <BrowserRouter basename="/Disney-Hotstar-react/">
      <App />
    </BrowserRouter>
  </StrictMode>,
)
