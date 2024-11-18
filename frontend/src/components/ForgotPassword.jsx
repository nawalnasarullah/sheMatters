import React, { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./Theme";
import { useForgotPasswordMutation } from "../redux/api/authApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const [forgotPassword] = useForgotPasswordMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await forgotPassword(email).unwrap();
      setTimeout(() => {
        navigate("/login");
      }, 2000);
      console.log(response);

      if (response.success) {
        toast.success(response.message);
        
      } else {
        toast.error(response.message || "An unexpected error occurred.");
      }
    } catch (error) {
      console.error(error);
      if (error?.data?.message) {
        toast.error(error.data.message);
      } else {
        toast.error("An error occurred. Please try again.");
      }
    }

  };

  return (
    <ThemeProvider theme={theme}>
      <div className="container mt-36">
        <form onSubmit={handleSubmit}>
          <h2 className="title font-primaryFont">Forgot Password?</h2>
          <h2 className=" font-primaryFont">Enter your email</h2>

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
          theme="light"
        />
      </div>
    </ThemeProvider>
  );
}

export default ForgotPassword;
