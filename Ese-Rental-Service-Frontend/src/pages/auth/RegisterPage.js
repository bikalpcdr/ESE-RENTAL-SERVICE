import React, { useState } from "react";
import '../../styles/RegisterPage.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    phoneNumber: ''
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
        const response = await axios.post("http://localhost:9000/api/auth/register", {
            username: form.username,
            password: form.password,
            email: form.email,
            fullName: form.fullName,
            phoneNumber: form.phoneNumber
        });
        setLoading(false);
        setSuccess("Registration successful! You can now log in.");
        setForm({
            fullName: '',
            email: '',
            username: '',
            password: '',
            confirmPassword: '',
            phoneNumber: ''
        });
        // Redirect to login page after successful registration (optional)
        // navigate('/login'); 

    } catch (err) {
        setLoading(false);
        if (err.response && err.response.data) {
            setError(err.response.data.message || 'Registration failed.');
        } else {
            setError('Registration failed. Please try again later.');
        }
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
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={handleChange}
              required
              style={{ width: '100%' }}
            />
            <button
              type="button"
              className="show-password-btn"
              onClick={() => setShowPassword(!showPassword)}
              tabIndex={-1}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            className="register-input"
            placeholder="Confirm your password"
            type={showPassword ? "text" : "password"}
            value={form.confirmPassword}
            onChange={handleChange}
            required
          />
           <label htmlFor="phoneNumber">Phone Number (Optional)</label>
           <input
             id="phoneNumber"
             name="phoneNumber"
             className="register-input"
             placeholder="Enter your phone number"
             value={form.phoneNumber}
             onChange={handleChange}
           />
          <button type="submit" className="register-submit" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
          {error && <div className="register-error">{error}</div>}
          {success && <div className="register-success">{success}</div>}
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