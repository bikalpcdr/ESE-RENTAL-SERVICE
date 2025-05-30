import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import HomePage from "./pages/HomePage";
import { useState } from "react";

function App() {
    const [token, setToken] = useState(localStorage.getItem("token"));

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                {!token ? (
                    <Route path="/login" element={<LoginPage onLogin={setToken} />} />
                ) : (
                    <Route path="/dashboard" element={<DashboardPage />} />
                )}
                <Route path="*" element={<h2>Page Not Found</h2>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
