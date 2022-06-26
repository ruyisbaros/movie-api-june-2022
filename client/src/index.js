import React from 'react';
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom"
import ThemeProvider from "./Context/ThemeProvider.jsx"
import AuthProvider from "./Context/AuthProvider.jsx"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <ToastContainer position="bottom-center" limit={1} />
    <AuthProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </AuthProvider>
  </BrowserRouter>
);

