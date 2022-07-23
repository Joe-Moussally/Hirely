import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Login from './pages/Login';

import {
    BrowserRouter,
    Routes,
    Route,
  } from "react-router-dom";
import Dashboard from './pages/Dashboard';
import Navbar from './components/dashboard-components/Navbar';
import Users from './pages/Users';
import Offers from './pages/Offers';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <>
        <BrowserRouter>
            <Navbar />
            <Routes>

            <Route path="/" element={<App />}/>
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/offers" element={<Offers />} />


            </Routes>
        </BrowserRouter>
    </>
);