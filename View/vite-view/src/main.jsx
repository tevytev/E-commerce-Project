import React from 'react'
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx'
import { AuthProvider } from './context/AuthProvider';
import ErrorPage from './error-page';
import { BrowserRouter, Route, Routes, Link, NavLink, useLocation } from 'react-router-dom'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/*' element={<App />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);