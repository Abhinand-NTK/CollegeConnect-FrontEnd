import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast';
import { AuthContext, Context } from './context/contex.jsx'




ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Context>
        <App />
      </Context>
      <Toaster />
    </BrowserRouter>
  </React.StrictMode>,
)
