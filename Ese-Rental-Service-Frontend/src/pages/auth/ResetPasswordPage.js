import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { api } from '../../api';
import { toast } from 'react-toastify';
import '../../styles/ResetPasswordPage.css';

function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { resetToken, identifier } = location.state || {};

  // Redirect if no reset token or identifier
  React.useEffect(() => {
    if (!resetToken || !identifier) {
      navigate('/forgot-password');
    }
  }, [resetToken, identifier, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      toast.error('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      toast.error('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);

    try {
      const response = await api.post('/auth/reset-password', {
        resetToken,
        identifier,
        newPassword: password
      });

      const { status, message } = response.data;

      if (status) {
        toast.success(message || 'Password reset successful');
        // Redirect to login page after successful password reset
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setError(message || 'Failed to reset password');
        toast.error(message || 'Failed to reset password');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to reset password. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reset-password-container">
      <main className="reset-password-main">
        <div className="reset-password-logo">
          <span role="img" aria-label="lock">🔒</span>
        </div>
        <h2 className="reset-password-title">Reset Password</h2>
        <form className="reset-password-form" onSubmit={handleSubmit}>
          <label htmlFor="password">New Password</label>
          <div style={{ position: 'relative' }}>
            <input
              id="password"
              className="reset-password-input"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
          <label htmlFor="confirmPassword">Confirm New Password</label>
          <input
            id="confirmPassword"
            className="reset-password-input"
            type={showPassword ? "text" : "password"}
            placeholder="Confirm your new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit" className="reset-password-submit" disabled={loading}>
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
          {error && <div className="reset-password-error">{error}</div>}
        </form>
        <div className="page-nav-buttons">
          <button onClick={() => navigate(-1)} className="back-button">Back to Previous</button>
          <button onClick={() => navigate('/')} className="home-button">Go to Home</button>
        </div>
      </main>
    </div>
  );
}

export default ResetPasswordPage; 