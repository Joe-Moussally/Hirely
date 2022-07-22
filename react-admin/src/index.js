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

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <>
        <BrowserRouter>
            <Routes>

            <Route path="/" element={<App />}/>
            <Route path="login" element={<Login />} />
            <Route path="dashboard" element={<Dashboard />} />


            </Routes>
        </BrowserRouter>
    </>
);