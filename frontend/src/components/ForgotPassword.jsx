import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./Theme";
import { useForgotPasswordMutation } from "../redux/api/authApi";
import { useState } from "react";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [forgotPassword] = useForgotPasswordMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await forgotPassword(email).unwrap();
      if (response.success) {
        setMessage("Check your email for a password reset link.");
      }
    } catch (error) {
      setMessage("Failed to send reset link. Please try again.");
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <div className="container mt-36">
        <form onSubmit={handleSubmit}>
          <h2 className="title font-primaryFont">Forgot Password?</h2>
          <h2 className=" font-primaryFont">Enter your email</h2>

          {/* Email Input */}
          <div className="input-field">
            <i className="fas fa-envelope" />
            <input
              className="mb-3 mt-3"
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button type="submit" className="btn solid w-52">
            Send Reset Link
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

export default ForgotPassword;
