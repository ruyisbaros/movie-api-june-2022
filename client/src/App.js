import React, { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/user/navbar/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import EmailVerification from './pages/EmailVerification';
import ForgetPassword from './pages/ForgetPassword';
import ConfirmPassword from './pages/ConfirmPassword';
import PageNotFound from './pages/PageNotFound';

function App() {
  return (
    <div className="main-app">
      <>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verification" element={<EmailVerification />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/confirm-password" element={<ConfirmPassword />} />
          <Route path="/*" element={<PageNotFound />} />
        </Routes>

      </>
    </div>
  );
}

export default App;
