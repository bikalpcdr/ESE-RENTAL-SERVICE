import React, { useState, useEffect } from "react";
import '../../styles/common/ResetPasswordPage.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { authService } from '../../api/authService';
import { toast } from 'react-toastify';

function ResetPasswordPage() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resetToken, setResetToken] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const toastConfig = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  };

  useEffect(() => {
    if (location.state && location.state.token) {
      setResetToken(location.state.token);
    } else {
      toast.error("Invalid or missing reset token. Please request a new password reset.", toastConfig);
      navigate('/forgot-password');
    }
  }, [location.state, navigate, toastConfig]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.", toastConfig);
      setLoading(false);
      return;
    }

    try {
      const response = await authService.resetPassword({
        token: resetToken,
        newPassword: newPassword,
        confirmPassword: confirmPassword,
      });

      const { status, message } = response.data;

      if (status) {
        toast.success(message || "Your password has been reset successfully!", toastConfig);
        setTimeout(() => navigate('/login'), 2000);
      } else {
        toast.error(message || 'Failed to reset password.', toastConfig);
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to reset password. Please try again.';
      toast.error(errorMessage, toastConfig);
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
          <label htmlFor="newPassword">New Password</label>
          <input
            id="newPassword"
            className="reset-password-input"
            placeholder="Enter your new password"
            type="password"
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            required
          />
          <label htmlFor="confirmPassword">Confirm New Password</label>
          <input
            id="confirmPassword"
            className="reset-password-input"
            placeholder="Confirm your new password"
            type="password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit" className="reset-password-submit" disabled={loading}>
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
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