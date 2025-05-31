import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { api } from '../../api'; // Assuming api instance is used
import { toast } from 'react-toastify'; // Import toast for notifications
import '../../styles/ResetPasswordPage.css'; // Uncommented CSS import

function ResetPasswordPage() {
  const [passwords, setPasswords] = useState({
    newPassword: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const location = useLocation();
  // Get identifier and resetToken from previous page state
  const { identifier, resetToken } = location.state || {};

  useEffect(() => {
    // Redirect if identifier or resetToken is missing
    if (!identifier || !resetToken) {
      // Optionally show an error toast here
      toast.error('Missing information for password reset. Please start over.');
      navigate('/forgot-password');
    }
  }, [identifier, resetToken, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswords(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (passwords.newPassword !== passwords.confirmPassword) {
      const mismatchError = 'New password and confirm password do not match.';
      setError(mismatchError);
      toast.error(mismatchError);
      setLoading(false);
      return;
    }

    // Add more password validation if needed (e.g., length, complexity)
    if (passwords.newPassword.length < 6) {
        const lengthError = 'Password must be at least 6 characters long.';
        setError(lengthError);
        toast.error(lengthError);
        setLoading(false);
        return;
    }

    console.log('Attempting to reset password for', identifier);

    try {
      // Implement API call to backend to reset password with correct keys
      const response = await api.post('/auth/reset-password', { 
        token: resetToken, // Use token key as required by backend
        newPassword: passwords.newPassword, 
        newPasswordConfirm: passwords.confirmPassword // Include confirm password
      });

      toast.success(response.data.message || 'Password reset successfully.');
      setLoading(false);

      // Navigate to login page after successful API call
      navigate('/login');

    } catch (err) {
       setLoading(false);
       const errorMessage = err.response?.data?.message || 'Failed to reset password. Please try again.';
       setError(errorMessage);
       toast.error(errorMessage);
    }
  };

  // Render null or a loading indicator while useEffect checks for data
  if (!identifier || !resetToken) {
      return React.createElement('div', null, 'Loading or redirecting...'); // Or null/loading spinner
  }

  return React.createElement('div', { className: 'min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8' },
        React.createElement('div', { className: 'max-w-md w-full space-y-8 reset-password-form' },
            React.createElement('div', null,
                React.createElement('h2', { className: 'mt-6 text-center text-3xl font-extrabold text-gray-900' },
                    'Reset Password'
                ),
                React.createElement('p', { className: 'mt-2 text-center text-sm text-gray-600' },
                    'Set your new password'
                )
            ),
            React.createElement('form', { className: 'mt-8 space-y-6', onSubmit: handleSubmit },
                React.createElement('div', { className: 'reset-password-input-group' },
                    React.createElement('div', null,
                        React.createElement('label', { htmlFor: 'newPassword', className: 'sr-only' }, 'New Password'),
                        React.createElement('input', {
                            id: 'newPassword',
                            name: 'newPassword',
                            type: 'password',
                            required: true,
                            className: 'reset-password-input',
                            placeholder: 'New Password',
                            value: passwords.newPassword,
                            onChange: handleChange
                        })
                    ),
                    React.createElement('div', null,
                        React.createElement('label', { htmlFor: 'confirmPassword', className: 'sr-only' }, 'Confirm Password'),
                        React.createElement('input', {
                            id: 'confirmPassword',
                            name: 'confirmPassword',
                            type: 'password',
                            required: true,
                            className: 'reset-password-input',
                            placeholder: 'Confirm Password',
                            value: passwords.confirmPassword,
                            onChange: handleChange
                        })
                    )
                ),
                React.createElement('div', null,
                    React.createElement('button', {
                        type: 'submit',
                        disabled: loading,
                        className: 'reset-password-submit'
                    }, loading ? 'Resetting...' : 'Reset Password')
                ),
                error && React.createElement('div', { className: 'mt-4 text-center text-sm text-red-600' }, error)
            )
        )
    );
}

export default ResetPasswordPage; 