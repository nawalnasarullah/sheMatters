import React from "react";
import { createRoutesFromElements, Route, RouterProvider } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import "./App.css";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import LoginSignUp from "./pages/LoginSignup";
import UserProfile from "./pages/UserProfile";
import ForClinicians from "./pages/ForClinicians";
import AccountInformation from "./pages/AccountInformation";
import DashboardLayout from "./components/DashboardLayout";
import IndividualTherapy from "./pages/IndividualTherapy";
import TeensTherapy from "./pages/TeensTherapy";
import Maritaltherapy from "./pages/MaritalTherapy";
import MotherhoodTherapy from "./pages/MotherhoodTherapy";
import LoginSignupPsychologist from "./pages/LoginSignupPsychologist";
import LoginSignupAdmin from "./pages/LoginSignupAdmin";
import Journal from "./pages/Journal";
import UserDashboardMain from "./pages/UserDashboardMain";
import UserQuestionnaireForm from "./pages/UserQuestionnaireForm";
import AllJournals from "./pages/AllJournals";
import JournalDetails from "./pages/JournalDetails";
import ClinicianDashboardLayout from "./pages/clinician/ClinicianDashboardLayout";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/clinicians" element={<ForClinicians />} />
          <Route path="/individual" element={<IndividualTherapy />} />
          <Route path="/teens" element={<TeensTherapy />} />
          <Route path="/marital" element={<Maritaltherapy />} />
          <Route path="/motherhood" element={<MotherhoodTherapy />} />
        </Route>
        <Route path="/login" element={<LoginSignUp />} />
        <Route path="/loginPsychologist" element={<LoginSignupPsychologist />} />
        <Route path="/loginAdmin" element={<LoginSignupAdmin />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/resetPassword" element={<ResetPassword />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<UserDashboardMain/>} />
          <Route path="user/questionnaire" element={<UserQuestionnaireForm />} />
          <Route path="accountInfo" element={<AccountInformation />} />
          <Route path="userProfile" element={<UserProfile />} />
          <Route path="journal" element={<Journal />} />
          <Route path="journal/all" element={<AllJournals />} />
          <Route path="journal/:id" element={<JournalDetails />} />
        </Route>
        <Route path="/clinician/dashboard" element={<ClinicianDashboardLayout />}>
        </Route>
      </Route>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
