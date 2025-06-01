import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import HomePage from "./pages/HomePage";
import { useState } from "react";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import RegisterPage from "./pages/auth/RegisterPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import VerifyOTPPage from "./pages/auth/VerifyOTPPage";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";
import SuperAdminDashboard from "./pages/superadmin/SuperAdminDashboard";

function App() {
    const [token, setToken] = useState(localStorage.getItem("token"));

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage onLogin={setToken} />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/verify-otp" element={<VerifyOTPPage />} />
                <Route path="/reset-password" element={<ResetPasswordPage />} />
                <Route path="/superadmin/dashboard" element={<SuperAdminDashboard />} />
                <Route path="*" element={<h2>Page Not Found</h2>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
