import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/common/LoadingSpinner'; // Path to your LoadingSpinner

const PrivateRoute = ({ children, roles }) => {
    const { isAuthenticated, loading, userRole } = useAuth();

    if (loading) {
        return <LoadingSpinner />;
    }

    if (!isAuthenticated) {
        // Not authenticated, redirect to login page
        return <Navigate to="/login" replace />;
    }

    if (roles && roles.length > 0) {
        if (!userRole || !roles.includes(userRole)) {
            // Authenticated but no required role or incorrect role, redirect to unauthorized or home
            // You might want a specific unauthorized page or just redirect to home
            return <Navigate to="/" replace />;
        }
    }

    // Authenticated and has the required role, render the children
    return children;
};

export default PrivateRoute; 