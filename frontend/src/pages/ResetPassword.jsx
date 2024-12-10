import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../components/Theme';
import { useResetPasswordMutation } from '../redux/api/authApi';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function ResetPassword() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const [resetPassword] = useResetPasswordMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }

    try {
      const response = await resetPassword({ token, newPassword }).unwrap();
      console.log(response);

      if (response.success) {
        toast.success('Your password has been reset successfully.');
        setTimeout(() => {
            navigate("/login");
          }, 2000);
      } else {
        toast.error(response.message || 'An unexpected error occurred.');
      }
    } catch (error) {
      if (error?.data?.message) {
        toast.error(error.data.message);
      } else {
        toast.error('Failed to reset password. Please try again.');
      }
    }

    // Reset the form after successful password reset
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="container mt-28">
        <form onSubmit={handleSubmit}>
          <h2 className="title font-primaryFont">Reset Password</h2>
          <h2 className="font-primaryFont">Enter your password</h2>

          <div className="input-field">
            <i className="fas fa-lock" />
            <input
              className="mb-3 mt-3"
              type="password"
              placeholder="Enter new password"
              name="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className="input-field">
            <i className="fas fa-lock" />
            <input
              className="mb-3 mt-3"
              type="password"
              placeholder="Confirm password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn solid w-52">
            Reset Password
          </button>
        </form>

      
        <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light" />
      </div>
    </ThemeProvider>
  );
}

export default ResetPassword;
