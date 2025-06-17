import React, { useState, useEffect } from 'react';
import '../../styles/superadmin/UserForm.css';
import { toast } from 'react-toastify';

function UserForm({ onSubmit, onCancel, editingUser, loading, error }) {
    const [formData, setFormData] = useState({
        id: '',
        username: '',
        email: '',
        password: '',
        fullName: '',
        phoneNumber: '',
        role: 'CUSTOMER' // Default role
    });
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        if (editingUser) {
            setFormData({
                id: editingUser.id || '',
                username: editingUser.username || '',
                email: editingUser.email || '',
                password: '', // Password is never pre-filled for security
                fullName: editingUser.fullName || '',
                phoneNumber: editingUser.phoneNumber || '',
                role: editingUser.role || 'CUSTOMER'
            });
        } else {
            setFormData({
                id: '',
                username: '',
                email: '',
                password: '',
                fullName: '',
                phoneNumber: '',
                role: 'CUSTOMER'
            });
        }
    }, [editingUser]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!editingUser && !formData.password) {
            toast.error("Password is required for new users.");
            return;
        }
        onSubmit(formData);
    };

    return (
        <div className="user-form-container">
            <h2 className="user-form-title">{editingUser ? 'Edit User' : 'Add New User'}</h2>
            <form className="user-form" onSubmit={handleSubmit}>
                <label htmlFor="fullName">Full Name</label>
                <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter full name"
                    required
                />

                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter email"
                    required
                />

                <label htmlFor="username">Username</label>
                <input
                    id="username"
                    name="username"
                    type="text"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Enter username"
                    required
                />

                <label htmlFor="password">Password</label>
                <div className="password-input-wrapper">
                    <input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={handleChange}
                        placeholder={editingUser ? "Leave blank to keep current" : "Enter password"}
                        required={!editingUser}
                    />
                    <button
                        type="button"
                        className="toggle-password-visibility"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? 'Hide' : 'Show'}
                    </button>
                </div>

                <label htmlFor="phoneNumber">Phone Number (Optional)</label>
                <input
                    id="phoneNumber"
                    name="phoneNumber"
                    type="text"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                />

                <label htmlFor="role">Role</label>
                <select id="role" name="role" value={formData.role} onChange={handleChange} required>
                    <option value="CUSTOMER">CUSTOMER</option>
                    <option value="LANDLORD">LANDLORD</option>
                    <option value="ADMIN">ADMIN</option>
                    <option value="SUPER_ADMIN">SUPER_ADMIN</option>
                </select>

                <div className="form-actions">
                    <button type="submit" className="submit-btn" disabled={loading}>
                        {loading ? 'Saving...' : (editingUser ? 'Update User' : 'Add User')}
                    </button>
                    <button type="button" onClick={onCancel} className="cancel-btn" disabled={loading}>
                        Cancel
                    </button>
                </div>
                {error && <p className="form-error">{error}</p>}
            </form>
        </div>
    );
}

export default UserForm; 