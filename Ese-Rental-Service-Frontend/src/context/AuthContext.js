import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { jwtDecode } from 'jwt-decode'; // Import jwtDecode to decode token
import { axiosInstance } from '../api/axiosInstance';
import { authService } from '../api/authService'; // We will create this service soon
import { toast } from 'react-toastify';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const [loading, setLoading] = useState(true);

    const toastConfig = {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
    };

    const decodeToken = useCallback((token) => {
        try {
            const decoded = jwtDecode(token);
            // Assuming your token has 'sub' for username and 'role' for user role
            return { username: decoded.sub, role: decoded.role, ...decoded }; 
        } catch (error) {
            console.error("Error decoding token:", error);
            return null;
        }
    }, []);

    const checkAuthStatus = useCallback(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedUser = decodeToken(token);
            if (decodedUser) {
                // Check token expiration (if 'exp' is available in decoded token)
                if (decodedUser.exp && (decodedUser.exp * 1000 < Date.now())) {
                    console.warn("Token expired. Logging out.");
                    logout();
                } else {
                    setIsAuthenticated(true);
                    setUser(decodedUser);
                    setUserRole(decodedUser.role);
                }
            } else {
                logout(); // Invalid token
            }
        } else {
            setIsAuthenticated(false);
            setUser(null);
            setUserRole(null);
        }
        setLoading(false);
    }, [decodeToken]);

    useEffect(() => {
        checkAuthStatus();
    }, [checkAuthStatus]);

    const login = async (username, password) => {
        try {
            const res = await authService.login({ username, password });
            const { status, message, data } = res.data;
            if (status) {
                const token = data.token;
                localStorage.setItem('token', token);
                // Set token in axios instance for future requests
                axiosInstance.defaults.headers.Authorization = `Bearer ${token}`;
                checkAuthStatus();
                toast.success(message || 'Login successful!', toastConfig);
                return true;
            } else {
                toast.error(message || 'Login failed.', toastConfig);
                return false;
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Login failed. Please try again.';
            toast.error(errorMessage, toastConfig);
            return false;
        }
    };

    const logout = async () => {
        try {
            // Optional: Call backend logout endpoint if needed
            // await authService.logout();
        } catch (error) {
            console.error("Error during backend logout:", error);
        } finally {
            localStorage.removeItem('token');
            delete axiosInstance.defaults.headers.Authorization; // Remove token from axios instance
            setIsAuthenticated(false);
            setUser(null);
            setUserRole(null);
            toast.info('Logged out successfully.', toastConfig);
        }
    };

    const value = {
        isAuthenticated,
        user,
        userRole,
        loading,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}; 