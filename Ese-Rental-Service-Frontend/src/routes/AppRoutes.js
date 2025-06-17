import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from "react-router-dom";
import LoginPage from "../pages/common/LoginPage";
import HomePage from "../pages/common/HomePage";
import AboutPage from "../pages/common/AboutPage";
import ContactPage from "../pages/common/ContactPage";
import RegisterPage from "../pages/common/RegisterPage";
import ForgotPasswordPage from "../pages/common/ForgotPasswordPage";
import VerifyOTPPage from "../pages/common/VerifyOTPPage";
import ResetPasswordPage from "../pages/common/ResetPasswordPage";

// Admin Dashboards
import SuperAdminDashboardPage from "../pages/superadmin/SuperAdminDashboardPage";
import AdminDashboardPage from "../pages/admin/AdminDashboardPage";
import LandlordDashboardPage from "../pages/landlord/LandlordDashboardPage";
import CustomerDashboardPage from "../pages/customer/CustomerDashboardPage";

import { useAuth } from "../context/AuthContext";
import PrivateRoute from "./PrivateRoute";
import LoadingSpinner from "../components/common/LoadingSpinner";

function AppRoutes() {
    const { isAuthenticated, loading, userRole } = useAuth();
    const navigate = useNavigate();

    // Handle redirection after login/logout or initial load
    useEffect(() => {
        if (!loading) {
            if (!isAuthenticated) {
                const publicPaths = ['/', '/login', '/register', '/about', '/contact', '/forgot-password', '/verify-otp', '/reset-password'];
                if (!publicPaths.includes(window.location.pathname)) {
                    navigate('/login');
                }
            }
        }
    }, [isAuthenticated, loading, userRole, navigate]);

    if (loading) {
        return <LoadingSpinner />; // Show a loading spinner while authentication status is being checked
    }

    return (
        <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/verify-otp" element={<VerifyOTPPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />

            {/* Protected Routes */}
            <Route
                path="/superadmin/dashboard"
                element={
                    <PrivateRoute roles={['SUPER_ADMIN']}>
                        <SuperAdminDashboardPage />
                    </PrivateRoute>
                }
            />
            <Route
                path="/admin/dashboard"
                element={
                    <PrivateRoute roles={['ADMIN']}>
                        <AdminDashboardPage />
                    </PrivateRoute>
                }
            />
            <Route
                path="/landlord/dashboard"
                element={
                    <PrivateRoute roles={['LANDLORD']}>
                        <LandlordDashboardPage />
                    </PrivateRoute>
                }
            />
            <Route
                path="/customer/dashboard"
                element={
                    <PrivateRoute roles={['CUSTOMER']}>
                        <CustomerDashboardPage />
                    </PrivateRoute>
                }
            />

            {/* Catch-all route for 404 */} 
            <Route path="*" element={<h2>Page Not Found</h2>} />
        </Routes>
    );
}

export default AppRoutes;
