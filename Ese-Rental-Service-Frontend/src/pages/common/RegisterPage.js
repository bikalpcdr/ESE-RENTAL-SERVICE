import React, { useState } from "react";
import '../../styles/common/RegisterPage.css';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../api/authService'; // Import authService
import { toast } from 'react-toastify';

function RegisterPage() {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    phoneNumber: ''
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const toastConfig = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  };

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    
    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match.", toastConfig);
      return;
    }

    setLoading(true);
    try {
        const response = await authService.register({
            username: form.username,
            password: form.password,
            email: form.email,
            fullName: form.fullName,
            phoneNumber: form.phoneNumber
        });

        const { status, message } = response.data;
        
        if (status) {
            toast.success(message || "Registration successful! You can now log in.", toastConfig);
            setForm({
                fullName: '',
                email: '',
                username: '',
                password: '',
                confirmPassword: '',
                phoneNumber: ''
            });
            setTimeout(() => navigate('/login'), 2000);
        } else {
            toast.error(message || 'Registration failed.', toastConfig);
        }
    } catch (err) {
        const errorMessage = err.response?.data?.message || 'Registration failed. Please try again later.';
        toast.error(errorMessage, toastConfig);
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <main className="register-main">
        <div className="register-logo">
          <span role="img" aria-label="user">📝</span>
        </div>
        <h2 className="register-title">Register</h2>
        <form className="register-form" onSubmit={handleSubmit}>
          <label htmlFor="fullName">Full Name</label>
          <input
            id="fullName"
            name="fullName"
            className="register-input"
            placeholder="Enter your full name"
            value={form.fullName}
            onChange={handleChange}
            required
          />
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            className="register-input"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            className="register-input"
            placeholder="Choose a username"
            value={form.username}
            onChange={handleChange}
            required
          />
          <label htmlFor="password">Password</label>
          <div style={{ position: 'relative' }}>
            <input
              id="password"
              name="password"
              className="register-input"
              placeholder="Create a password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
              style={{ width: '100%' }}
            />
          </div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            className="register-input"
            placeholder="Confirm your password"
            type="password"
            value={form.confirmPassword}
            onChange={handleChange}
            required
          />
           <label htmlFor="phoneNumber">Phone Number (Optional)</label>
           <input
             id="phoneNumber"
             name="phoneNumber"
             className="register-input"
             placeholder="98XXXXXXXX or +97798XXXXXXXX"
             value={form.phoneNumber}
             onChange={handleChange}
             pattern="^(\+977)?[9][7-8]\d{8}$"
             title="Please enter a valid Nepali phone number starting with 97 or 98"
           />
          <button type="submit" className="register-submit" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
        <div className="register-links">
          <a href="/login" className="register-link">Already have an account? Login</a>
        </div>
        <div className="page-nav-buttons">
            <button onClick={() => navigate(-1)} className="back-button">Back to Previous</button>
            <button onClick={() => navigate('/')} className="home-button">Go to Home</button>
        </div>
      </main>
    </div>
  );
}

export default RegisterPage; 