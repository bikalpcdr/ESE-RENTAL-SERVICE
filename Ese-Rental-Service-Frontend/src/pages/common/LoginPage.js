import React, { useState } from "react";
import '../../styles/common/LoginPage.css';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // Import useAuth hook
import { toast } from 'react-toastify';

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth(); // Get login function from AuthContext

  const toastConfig = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      const success = await login(username, password);
      if (success) {
        // Login successful, AuthContext handles token and user role, redirects will be handled by AppRoutes later
        // For now, redirect based on what login function returns if needed, or rely on a useEffect in App.js
        toast.success("Login successful! Redirecting...", toastConfig);
        // Navigate to dashboard or home based on role after successful login is handled by AuthContext
        // The user's role information is now available in the AuthContext
        // The actual redirection logic should be in AppRoutes or a higher-level component that consumes AuthContext
        // For immediate feedback, let's navigate to home page, which will eventually be protected
        navigate('/'); 
      }
    } finally {
      setLoading(false);
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
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoComplete="current-password"
              required
              style={{ width: '100%' }}
            />
          </div>
          <button type="submit" className="login-submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
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
