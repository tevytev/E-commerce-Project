import React from 'react'
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx'
import ErrorPage from './error-page';
import { BrowserRouter, Route, Routes, Link, NavLink, useLocation } from 'react-router-dom'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
        <Routes>
          <Route path='/*' element={<App />} />
        </Routes>
    </BrowserRouter>
  </React.StrictMode>
);