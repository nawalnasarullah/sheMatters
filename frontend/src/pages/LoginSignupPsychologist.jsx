import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLoginPsychologistMutation } from "../redux/api/psychologistAuthApi";
import { useRegisterPsychologistMutation } from "../redux/api/psychologistAuthApi";
import { setPsychologistInfo } from "../redux/features/psychologistAuthSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function LoginSignupPsychologist() {
  const [isSignUpMode, setIsSignUpMode] = useState(false);

  const handleSignUpClick = () => {
    setIsSignUpMode(true);
  };

  const handleSignInClick = () => {
    setIsSignUpMode(false);
  };

  const [registerPsychologist] = useRegisterPsychologistMutation();

  const [loginPsychologist] = useLoginPsychologistMutation();



  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    handleChange: onSignUpChange,
    handleBlur: onSignUpBlur,
    handleSubmit: onSignUpSubmit,
    handleReset: onSignUpReset,
    errors: signUpErrors,
    touched: signUpTouched,
    values: signUpValues,
  } = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      cPassword: "",
      phoneNumber: "",
      cnic: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .matches(/^[A-Za-z ]*$/, "Please enter valid first name")
        .min(3, "Minimum 3 letters")
        .max(25, "Maximum 25 letters")
        .required("First Name is required")
        .trim(),
      lastName: Yup.string()
        .matches(/^[A-Za-z ]*$/, "Please enter valid last name")
        .min(3, "Minimum 3 letters")
        .max(25, "Maximum 25 letters")
        .required("Last Name is required")
        .trim(),
      username: Yup.string()
        .matches(/^[A-Za-z ]*$/, "Please enter valid Username")
        .min(3, "Minimum 3 letters")
        .max(25, "Maximum 25 letters")
        .required("Username is required")
        .trim(),
      email: Yup.string()
        .matches(
          /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
          "Please enter a valid email"
        )
        .required("Email is required")
        .trim(),
      password: Yup.string().required("Password is required").trim(),
      // password: Yup.string()
      //   .matches(
      //     /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      //     "Minimum eight characters, at least one letter, one number and one special character"
      //   )
      //   .required("password is required")
      //   .trim(),
      cPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match") // Ensure passwords match
        .required("Confirm Password is required")
        .trim(),
      phoneNumber: Yup.string().required("Phone number is required").trim(),
      cnic: Yup.string().required("CNIC is required").trim(),
    }),
    onSubmit: async (values) => {
      delete values.cPassword;
      console.log("values", values);

      const psychologist = await registerPsychologist(values).unwrap();
      console.log("ggggggg", psychologist);
      if (psychologist && psychologist.success) {
        toast.success(psychologist.message, {
          progressClassName: "toast-progress-success",
        });
      } else {
        toast.error(psychologist.message);
      }
      onSignUpReset();
    },
  });

  const {
    handleChange: onSignInChange,
    handleBlur: onSignInBlur,
    handleSubmit: onSignInSubmit,
    handleReset: onSignInReset,
    errors: signInErrors,
    touched: signInTouched,
    values: signInValues,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
      cnic: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .matches(
          /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
          "Please enter a valid email"
        )
        .required("Email is required")
        .trim(),
      // password: Yup.string()
      //   .matches(
      //     /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      //     "Minimum eight characters, at least one letter, one number and one special character"
      //   )
      //   .required("password is required")
      //   .trim(),
      password: Yup.string().required("Password is required").trim(),
      cnic: Yup.string().required("CNIC is required").trim(),
    }),
    onSubmit: async (values) => {
      const res = await loginPsychologist(values).unwrap();

      console.log("login", values);

      if (res && res.success) {
        dispatch(setPsychologistInfo(res));
        console.log(res);

        toast.success(res.message, {
          progressClassName: "toast-progress-success",
        });
        navigate("/");
      } else {
        toast.error(res.message);
      }

      onSignInReset();
    },
  });

  return (
    <div
      className={`div-container container ${
        isSignUpMode ? "sign-up-mode" : ""
      }`}
    >
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
      <div className="forms-container">
        <div className="signin-signup">
          <form className="sign-in-form" onSubmit={onSignInSubmit}>
            <h2 className="title font-primaryFont">Sign in</h2>

            {/* Email Input */}
            <div className="input-field">
              <i className="fas fa-envelope" />
              <input
                className="mb-3 mt-3"
                type="email"
                placeholder="Email"
                name="email" // Make sure this name matches initialValues.email
                value={signInValues.email}
                onChange={onSignInChange}
                onBlur={onSignInBlur}
              />
              <strong className="text-red-700 mx-2 text-[10px] w-[300%]">
                {signInErrors.email && signInTouched.email
                  ? signInErrors.email
                  : null}
              </strong>
            </div>

            {/* Cnic Input */}
            <div className="input-field">
              <i className="fa-regular fa-id-card" />
              <input
                className="mb-3 mt-3"
                type="text"
                placeholder="CNIC"
                name="cnic" // Make sure this name matches initialValues.email
                value={signInValues.cnic}
                onChange={onSignInChange}
                onBlur={onSignInBlur}
              />
              <strong className="text-red-700 mx-2 text-[10px] w-[300%]">
                {signInErrors.cnic && signInTouched.cnic
                  ? signInErrors.cnic
                  : null}
              </strong>
            </div>

            {/* Password Input */}
            <div className="input-field" style={{ marginRight: 2 }}>
              <i className="fas fa-lock" />
              <input
                className="mb-3 mt-3"
                type="password"
                placeholder="Password"
                name="password" // Make sure this name matches initialValues.password
                value={signInValues.password}
                onChange={onSignInChange}
                onBlur={onSignInBlur}
              />
              <strong className="text-red-700 mx-2 text-[10px] w-[300%]">
                {signInErrors.password && signInTouched.password
                  ? signInErrors.password
                  : null}
              </strong>
            </div>

            <button type="submit" className="btn solid">
              Login
            </button>
            <Link
              to="/forgotPassword"
              className="my-2 text-[12px] hover:text-primaryHover transition duration-300"
            >
              Forgot Password? Click Here
            </Link>
          </form>

          {/* Sign Up Form */}
          <form action="#" className="sign-up-form" onSubmit={onSignUpSubmit}>
            <h2 className="title font-primaryFont">Sign up</h2>
            <div style={{ display: "flex" }}>
              <div className="input-field" style={{ marginRight: 2 }}>
                <i className="fas fa-user" />
                <input
                  className="mb-3 mt-3"
                  type="text"
                  placeholder="First Name"
                  name="firstName"
                  value={signUpValues.firstName}
                  onChange={onSignUpChange}
                  onBlur={onSignUpBlur}
                />
                <strong className="text-red-700 mx-2 text-[10px] w-[300%]">
                  {signUpErrors.firstName && signUpTouched.firstName
                    ? signUpErrors.firstName
                    : null}
                </strong>
              </div>

              <div className="input-field" style={{ marginLeft: 2 }}>
                <i className="fas fa-user" />
                <input
                  className="mb-3 mt-3"
                  type="text"
                  placeholder="Last Name"
                  name="lastName"
                  value={signUpValues.lastName}
                  onChange={onSignUpChange}
                  onBlur={onSignUpBlur}
                />
                <strong className="text-red-700 mx-2 text-[10px] w-[300%]">
                  {signUpErrors.lastName && signUpTouched.lastName
                    ? signUpErrors.lastName
                    : null}
                </strong>
              </div>
            </div>
            <div className="input-field">
              <i className="fa-regular fa-id-card" />
              <input
                className="mb-3 mt-3"
                type="text"
                placeholder="CNIC"
                name="cnic" // Make sure this name matches initialValues.email
                value={signUpValues.cnic}
                onChange={onSignUpChange}
                onBlur={onSignUpBlur}
              />
              <strong className="text-red-700 mx-2 text-[10px] w-[300%]">
                {signUpErrors.cnic && signUpTouched.cnic
                  ? signUpErrors.cnic
                  : null}
              </strong>
            </div>
            <div style={{ display: "flex" }}>
              <div className="input-field" style={{ marginRight: 2 }}>
                <i className="fas fa-user" />
                <input
                  className="mb-3 mt-3"
                  type="text"
                  placeholder="Username"
                  name="username"
                  value={signUpValues.username}
                  onChange={onSignUpChange}
                  onBlur={onSignUpBlur}
                />
                <strong className="text-red-700 mx-2 text-[10px] w-[300%]">
                  {signUpErrors.username && signUpTouched.username
                    ? signUpErrors.username
                    : null}
                </strong>
              </div>
              <div className="input-field" style={{ marginLeft: 2 }}>
                <i className="fas fa-phone" />
                <input
                  className="mb-3 mt-3"
                  type="text"
                  placeholder="Phone Number"
                  name="phoneNumber"
                  value={signUpValues.phoneNumber}
                  onChange={onSignUpChange}
                  onBlur={onSignUpBlur}
                />
                <strong className="text-red-700 mx-2 text-[10px] w-[400%]">
                  {signUpErrors.phoneNumber && signUpTouched.phoneNumber
                    ? signUpErrors.phoneNumber
                    : null}
                </strong>
              </div>
            </div>
             
            <div className="input-field mr-1">
              <i className="fas fa-envelope" />
              <input
                className="mb-3 mt-3"
                type="email"
                placeholder="Email"
                name="email"
                value={signUpValues.email}
                onChange={onSignUpChange}
                onBlur={onSignUpBlur}
              />
              <strong className="text-red-700 mx-2 text-[10px] w-[300%]">
                {signUpErrors.email && signUpTouched.email
                  ? signUpErrors.email
                  : null}
              </strong>
            </div>
            
        
            <div style={{ display: "flex" }}>
              <div className="input-field" style={{ marginRight: 2 }}>
                <i className="fas fa-lock" />
                <input
                  className="mb-3 mt-3"
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={signUpValues.password}
                  onChange={onSignUpChange}
                  onBlur={onSignUpBlur}
                />
                <strong className="text-red-700 mx-2 text-[10px] w-[300%]">
                  {signUpErrors.password && signUpTouched.password
                    ? signUpErrors.password
                    : null}
                </strong>
              </div>
              <div className="input-field" style={{ marginLeft: 2 }}>
                <i className="fas fa-lock" />
                <input
                  className="mb-3 mt-3"
                  type="password"
                  placeholder="Confirm Password"
                  name="cPassword"
                  value={signUpValues.cPassword}
                  onChange={onSignUpChange}
                  onBlur={onSignUpBlur}
                />
                <strong className="text-red-700 mx-2 text-[10px] w-[400%]">
                  {signUpErrors.cPassword && signUpTouched.cPassword
                    ? signUpErrors.cPassword
                    : null}
                </strong>
              </div>
            </div>
            <button type="submit" className="btn">
              Sign Up
            </button>
          </form>
        </div>
      </div>

      {/* Panel for toggling sign-in and sign-up */}
      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>New here?</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            <button
              className="btn transparent"
              id="sign-up-btn"
              onClick={handleSignUpClick}
            >
              Sign up
            </button>
          </div>
          <img src="/images/psych-login.svg" className="image" alt="" />
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3>One of us?</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            <button
              className="btn transparent"
              id="sign-in-btn"
              onClick={handleSignInClick}
            >
              Sign in
            </button>
          </div>
          <img src="/images/psych-signup.svg" className="image" alt="" />
        </div>
      </div>
    </div>
  );
}

export default LoginSignupPsychologist;
