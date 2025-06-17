import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { axiosInstance } from '../../api/axiosInstance'; // Assuming axiosInstance instance is used
import { toast } from 'react-toastify'; // Import toast for notifications
import '../../styles/common/VerifyOTPPage.css'; // Uncommented CSS import
import { authService } from '../../api/authService';

function VerifyOTPPage() {
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resendLoading, setResendLoading] = useState(false); // State for resend loading
  const [timer, setTimer] = useState(60); // Timer for resend button

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
    if (location.state && location.state.email) {
      setEmail(location.state.email);
    } else {
      // If email is not passed, redirect back to forgot password
      toast.error("Please request an OTP first.", toastConfig);
      navigate('/forgot-password');
    }
  }, [location.state, navigate, toastConfig]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await authService.verifyOTP({ email, otp });
      const { status, message, data } = response.data;

      if (status) {
        toast.success(message || "OTP verified successfully!", toastConfig);
        setTimeout(() => navigate('/reset-password', { state: { token: data.resetToken } }), 2000);
      } else {
        toast.error(message || 'OTP verification failed.', toastConfig);
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'OTP verification failed. Please try again.';
      toast.error(errorMessage, toastConfig);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setResendLoading(true);
    setError('');
    try {
      const response = await authService.forgotPassword({ identifier: email });
      const { status, message } = response.data;
      if (status) {
        toast.success(message || "New OTP sent to your email!", toastConfig);
        setTimer(60); // Reset timer on successful resend
      } else {
        toast.error(message || 'Failed to resend OTP.', toastConfig);
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to resend OTP. Please try again.';
      toast.error(errorMessage, toastConfig);
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="verify-otp-container">
      <main className="verify-otp-main">
        <div className="verify-otp-logo">
          <span role="img" aria-label="code">✉️</span>
        </div>
        <h2 className="verify-otp-title">Verify OTP</h2>
        <p className="verify-otp-description">An OTP has been sent to your email: <strong>{email}</strong>. Please enter it below.</p>
        <form className="verify-otp-form" onSubmit={handleSubmit}>
          <label htmlFor="otp">OTP Code</label>
          <input
            id="otp"
            className="verify-otp-input"
            placeholder="Enter 6-digit OTP"
            value={otp}
            onChange={e => setOtp(e.target.value)}
            maxLength="6"
            required
          />
          <button type="submit" className="verify-otp-submit" disabled={loading}>
            {loading ? 'Verifying...' : 'Verify OTP'}
          </button>
        </form>
        <div className="verify-otp-links">
          <button onClick={handleResendOtp} className="verify-otp-link" disabled={loading}>Resend OTP</button>
          <button onClick={() => navigate('/forgot-password')} className="verify-otp-link">Change Email/Username</button>
        </div>
        <div className="page-nav-buttons">
          <button onClick={() => navigate(-1)} className="back-button">Back to Previous</button>
          <button onClick={() => navigate('/')} className="home-button">Go to Home</button>
        </div>
      </main>
    </div>
  );
}

export default VerifyOTPPage; 