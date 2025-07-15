import ReactDOM from 'react-dom/client'
import { AuthProvider } from './context/AuthContext';
import './index.css'
import App from './App.jsx'
import React from 'react'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <AuthProvider>
    <App />
  </AuthProvider>
  </React.StrictMode>
)
