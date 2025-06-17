import { axiosInstance } from './axiosInstance';

export const authService = {
    login: (credentials) => axiosInstance.post('/auth/login', credentials),
    register: (userData) => axiosInstance.post('/auth/register', userData),
    forgotPassword: (request) => axiosInstance.post('/auth/forgot-password', request),
    resetPassword: (request) => axiosInstance.post('/auth/reset-password', request),
    verifyOTP: (request) => axiosInstance.post('/auth/verify-otp', request),
    logout: () => axiosInstance.post('/auth/logout'),
};
