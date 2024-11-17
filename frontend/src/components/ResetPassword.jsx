import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from './Theme';
import { useResetPasswordMutation } from '../redux/api/authApi';

function ResetPassword() {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState(''); 
    const [message, setMessage] = useState('');
  
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    
  
    const [resetPassword] = useResetPasswordMutation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (newPassword !== confirmPassword) {
            setMessage("Passwords do not match.");
            return; 
        }
    
        try {
            const response = await resetPassword({ token, newPassword }).unwrap();
            console.log(response);
            
            if (response.success) {
                setMessage("Your password has been reset successfully.");
            }
        } catch (error) {
            setMessage("Failed to reset password. Please try again.");
        }
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
                {message && (
                    <p className="text-center flex justify-center items-center">
                        {message}
                    </p>
                )}
            </div>
        </ThemeProvider>
    );
}

export default ResetPassword;