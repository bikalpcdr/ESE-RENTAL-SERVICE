import React, { useState } from "react";
import '../../styles/ForgotPasswordPage.css';
import { useNavigate } from 'react-router-dom';
import { api } from '../../api'; // Import the configured axios instance

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
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setLoading(true);

    console.log('Requesting password reset for:', emailOrUsername);

    try {
      const response = await api.post('/auth/forgot-password', { identifier: emailOrUsername });
      
      const { email, phoneNumber } = response.data;

      const maskedEmail = maskEmail(email);
      const maskedPhoneNumber = maskPhoneNumber(phoneNumber);

      // Construct the single message using the masked values
      const successMessage = `An OTP has been sent to your registered email address ${maskedEmail} or mobile number ${maskedPhoneNumber}. Please check and enter the OTP to proceed to the next step`;

      setMessage(successMessage);
      setLoading(false);

      // Navigate to OTP verification page after successful request
      navigate('/verify-otp', { state: { identifier: emailOrUsername, maskedEmail: maskedEmail, maskedPhoneNumber: maskedPhoneNumber } });

    } catch (err) {
       setError(err.response?.data?.message || 'Failed to request password reset. Please try again.');
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
        <p className="forgot-password-description">Enter your email address or username and we will send you an OTP to reset your password.</p>
        <form className="forgot-password-form" onSubmit={handleSubmit}>
          <label htmlFor="emailOrUsername">Email or Username</label>
          <input
            id="emailOrUsername"
            className="forgot-password-input"
            placeholder="Enter your email or username"
            value={emailOrUsername}
            onChange={(e) => setEmailOrUsername(e.target.value)}
            required
          />
          <button type="submit" className="forgot-password-submit" disabled={loading}>
            {loading ? 'Sending...' : 'Request Reset OTP'}
          </button>
          {message && <div className="forgot-password-message">{message}</div>}
          {error && <div className="forgot-password-error">{error}</div>}
        </form>
        <div className="page-nav-buttons">
            <button onClick={() => navigate(-1)} className="back-button">Back to Previous</button>
            <button onClick={() => navigate('/')} className="home-button">Go to Home</button>
        </div>
      </main>
    </div>
  );
}

export default ForgotPasswordPage; 