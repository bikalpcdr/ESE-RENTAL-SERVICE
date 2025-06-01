import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { api } from '../../api'; // Assuming api instance is used
import { toast } from 'react-toastify'; // Import toast for notifications
import '../../styles/VerifyOTPPage.css'; // Uncommented CSS import

function VerifyOTPPage() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  // const [message, setMessage] = useState(''); // Using toast for messages
  const [error, setError] = useState('');
  const [resendLoading, setResendLoading] = useState(false); // State for resend loading
  const [timer, setTimer] = useState(60); // Timer for resend button

  const navigate = useNavigate();
  const location = useLocation();
  const identifier = location.state?.identifier; // Get identifier from previous page state
  const maskedEmail = location.state?.maskedEmail; // Get masked email from previous page state
  const maskedPhoneNumber = location.state?.maskedPhoneNumber; // Get masked phone number from previous page state

  useEffect(() => {
    // Redirect to forgot password if no identifier is found
    if (!identifier) {
      navigate('/forgot-password');
    }

    // Start the timer when the component mounts
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(interval);
          return 0;
        } else {
          return prevTimer - 1;
        }
      });
    }, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(interval);

  }, [identifier, navigate]);

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return; // Prevent more than one character per input
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus to the next input if a value is entered
    if (value && index < 5) {
        const nextInput = document.querySelector(`input[name=otp-${index + 1}]`);
        if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (index, e) => {
      // Move focus to previous input on backspace if current is empty
      if (e.key === 'Backspace' && !otp[index] && index > 0) {
          const prevInput = document.querySelector(`input[name=otp-${index - 1}]`);
          if (prevInput) prevInput.focus();
      }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const otpString = otp.join('');

    if (otpString.length !== 6) {
        setError('Please enter a 6-digit OTP.');
        toast.error('Please enter a 6-digit OTP.');
        setLoading(false);
        return;
    }

    console.log('Verifying OTP for', identifier, ':', otpString);

    try {
      const response = await api.post('/auth/verify-otp', { email: identifier, otp: otpString });
      
      const { status, message, data } = response.data;

      if (status) {
        // Assuming backend returns resetToken on successful verification
        const { resetToken } = data;

        toast.success(message || 'OTP verified successfully.');
        setLoading(false);

        // Navigate to reset password page, passing resetToken and identifier
        navigate('/reset-password', { state: { resetToken, identifier } });
      } else {
        setError(message || 'Failed to verify OTP. Please try again.');
        toast.error(message || 'Failed to verify OTP. Please try again.');
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      const errorMessage = err.response?.data?.message || 'Failed to verify OTP. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  // Resend OTP functionality
  const handleResendOTP = async () => {
    setResendLoading(true);
    setError('');
    try {
      const response = await api.post('/auth/resend-otp', { identifier });
      const { status, message } = response.data;
      
      if (status) {
        toast.success(message || 'OTP resent successfully. Please check your email or phone.');
        setTimer(60); // Reset timer on successful resend
      } else {
        toast.error(message || 'Failed to resend OTP. Please try again later.');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to resend OTP. Please try again later.';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setResendLoading(false);
    }
  };

  // Render null or a loading indicator while useEffect checks for data
  if (!identifier) {
      return React.createElement('div', null, 'Loading or redirecting...'); // Or null/loading spinner
  }

  // Construct the detailed message using masked values
  const detailedMessage = `An OTP has been sent to your registered email address ${maskedEmail || identifier} or mobile number ${maskedPhoneNumber || identifier}. Please check and enter the OTP to proceed to the next step`;

  return React.createElement('div', { className: 'min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8' },
        React.createElement('div', { className: 'max-w-md w-full space-y-8 verify-otp-form' },
            React.createElement('div', null,
                React.createElement('h2', { className: 'mt-6 text-center text-3xl font-extrabold text-gray-900' },
                    'Verify OTP'
                ),
                React.createElement('p', { className: 'mt-2 text-center text-sm text-gray-600' },
                    detailedMessage // Display the detailed message
                )
            ),
            React.createElement('form', { className: 'mt-8 space-y-6', onSubmit: handleSubmit },
                React.createElement('div', { className: 'otp-input-group' }, // Use the flexbox class
                    otp.map((digit, index) => (
                        React.createElement('input', {
                            key: index,
                            name: `otp-${index}`,
                            type: 'text',
                            maxLength: 1,
                            required: true,
                            className: 'verify-otp-input', // Use the updated input class
                            value: digit,
                            onChange: (e) => handleOtpChange(index, e.target.value),
                            onKeyDown: (e) => handleKeyDown(index, e)
                        })
                    ))
                ),
                React.createElement('div', { className: 'flex flex-col items-center space-y-4' },
                    React.createElement('button', {
                        type: 'submit',
                        disabled: loading,
                        className: 'verify-otp-submit' // Use the updated submit class
                    }, loading ? 'Verifying...' : 'Verify OTP'),
                    // Add the Resend OTP text and link
                    React.createElement('div', { className: 'resend-otp-text' },
                        'Didn\'t receive code? ',
                        timer > 0 ?
                        `Resend in ${timer}s` :
                        React.createElement('span', {
                            className: `resend-otp-link ${resendLoading ? 'disabled' : ''}`,
                            onClick: timer === 0 && !resendLoading ? handleResendOTP : null,
                            style: { cursor: timer > 0 || resendLoading ? 'not-allowed' : 'pointer' }
                        }, resendLoading ? 'Sending...' : 'Request again')
                    )
                ),
                // message && React.createElement('div', { className: 'mt-4 text-center text-sm text-green-600' }, message), // Using toast for messages
                error && React.createElement('div', { className: 'mt-4 text-center text-sm text-red-600' }, error) // Keep error message
            )
        )
    );
}

export default VerifyOTPPage; 