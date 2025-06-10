import React, { useState } from "react";
import axios from "axios";
import '../../styles/LoginPage.css';
import { useNavigate, Link } from 'react-router-dom';



function LoginPage({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.post("http://localhost:9000/api/auth/login", {
        username,
        password,
      });
      
      // Handle the new GlobalAPIResponse format
      const { status, message, data } = res.data;
      
      if (status) {
        const token = data.token;
        localStorage.setItem("token", token);
        onLogin(token);
        console.log('Login successful, response data:', data);
        
        // Check user role and redirect accordingly
        const userRole = data.role;
        if (userRole === 'SUPER_ADMIN') {
          navigate('/superadmin/dashboard');
        } else {
          navigate('/');
        }
      } else {
        setError(message || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      setLoading(false);
      if (err.response && err.response.data) {
        setError(err.response.data.message || 'Login failed. Please check your credentials.');
      } else {
        setError('Login failed. Please try again later.');
      }
    }
  };

  return (
    <div className="login-container">
      <main className="login-main">
        <div className="login-logo">
          <span role="img" aria-label="lock">🔒</span>
        </div>
        <h2 className="login-title">Login</h2>
        <form className="login-form" onSubmit={e => { e.preventDefault(); handleLogin(); }}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            className="login-input"
            placeholder="Enter your username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            autoComplete="username"
            required
          />
          <label htmlFor="password">Password</label>
          <div style={{ position: 'relative' }}>
            <input
              id="password"
              className="login-input"
              placeholder="Enter your password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoComplete="current-password"
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
              {showPassword ? <i className="fa-regular fa-eye"></i> : <i className="fa-regular fa-eye-slash"></i>}
            </button>
          </div>
          <button type="submit" className="login-submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
          {error && <div className="login-error">{error}</div>}
        </form>
        <div className="login-links">
          <Link to="/forgot-password" className="login-link">Forgot password?</Link>
          <Link to="/register" className="login-link">Register</Link>
        </div>
        <div className="page-nav-buttons">
          <button onClick={() => navigate(-1)} className="back-button">Back to Previous</button>
          <button onClick={() => navigate('/')} className="home-button">Go to Home</button>
        </div>
      </main>
    </div>
  );
}

export default LoginPage;
