import React, { useState } from "react";
import '../../styles/common/ForgotPasswordPage.css';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../../api/authService';
import { toast } from 'react-toastify';

// Helper function to mask email as bik******@mail.com
const maskEmail = (email) => {
  if (!email) return 'unknown email'; // Default text if email is not provided
  const parts = email.split('@');
  const username = parts[0];
  
  // Mask username: show first 3 characters, then ******
  const maskedUsernamePart = username.length > 3 
    ? username.substring(0, 3) + '******' 
    : username + '******'; // Handle usernames shorter than 4 chars

  return `${maskedUsernamePart}@mail.com`; // Use the specified domain part
};

// Helper function to mask phone number as 986*****00
const maskPhoneNumber = (phoneNumber) => {
  if (!phoneNumber) return 'unknown phone number'; // Default text if phone is not provided
  
  // Mask phone number: show first 3, then *****, then last 2
  // Ensure phone number is long enough for this specific masking
  if (phoneNumber.length >= 5) { 
    const prefix = phoneNumber.substring(0, 3);
    const suffix = phoneNumber.substring(phoneNumber.length - 2);
    return `${prefix}*****${suffix}`;
  }
  return 'XXXXXXX'; // Fallback if too short for the specific format
};

function ForgotPasswordPage() {
  const [identifier, setIdentifier] = useState("");
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await authService.forgotPassword({ identifier });
      const { status, message } = response.data;

      if (status) {
        toast.success(message || "OTP sent to your email!", toastConfig);
        setTimeout(() => navigate('/verify-otp', { state: { email: identifier } }), 2000);
      } else {
        toast.error(message || 'Failed to send OTP.', toastConfig);
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to send OTP. Please try again.';
      toast.error(errorMessage, toastConfig);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-password-container">
      <main className="forgot-password-main">
        <div className="forgot-password-logo">
          <span role="img" aria-label="lock">🔑</span>
        </div>
        <h2 className="forgot-password-title">Forgot Password</h2>
        <form className="forgot-password-form" onSubmit={handleSubmit}>
          <label htmlFor="identifier">Username or Email</label>
          <input
            id="identifier"
            className="forgot-password-input"
            placeholder="Enter your username or email"
            value={identifier}
            onChange={e => setIdentifier(e.target.value)}
            required
          />
          <button type="submit" className="forgot-password-submit" disabled={loading}>
            {loading ? 'Sending OTP...' : 'Send OTP'}
          </button>
        </form>
        <div className="forgot-password-links">
          <Link to="/login" className="forgot-password-link">Back to Login</Link>
        </div>
        <div className="page-nav-buttons">
          <button onClick={() => navigate(-1)} className="back-button">Back to Previous</button>
          <button onClick={() => navigate('/')} className="home-button">Go to Home</button>
        </div>
      </main>
    </div>
  );
}

export default ForgotPasswordPage; 