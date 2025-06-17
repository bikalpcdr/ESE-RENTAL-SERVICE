import { axiosInstance } from './axiosInstance';

export const userService = {
    getAllUsers: () => axiosInstance.get('/users'),
    getUserById: (id) => axiosInstance.get(`/users/${id}`),
    createUser: (userData) => axiosInstance.post('/users', userData),
    updateUser: (id, userData) => axiosInstance.put(`/users/${id}`, userData),
    deleteUser: (id) => axiosInstance.delete(`/users/${id}`),
    toggleUserStatus: (id) => axiosInstance.post(`/users/toggle-status/${id}`),
    // Add more user-related API calls as needed
};
