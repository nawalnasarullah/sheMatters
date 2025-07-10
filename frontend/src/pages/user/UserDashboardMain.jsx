import React from "react";
import ProfileSetupReminder from "./ProfileSetupReminder";
import PsychologistRecommendations from "./PsychologistRecommendations";
import AppointmentReminder from "../../components/AppointmentReminder";
import { useSelector } from "react-redux";
import { isProfileComplete, isQuestionnaireComplete } from "../../utils/utils";
import { useGetMeQuery } from "../../redux/api/authApi";
export default function UserDashboardMain() {
  const { data, isLoading } = useGetMeQuery();  // if you dont wanna persist  add this  

  const { user, isAuthenticated } = useSelector((state) => state.auth);
  
  if (!isAuthenticated) return null;

  const profileComplete = isProfileComplete(user?.user || {});
  const questionnaireComplete = isQuestionnaireComplete(user?.user || {});

  const canShowDashboardContent = profileComplete && questionnaireComplete;

  return (
    <section className="user-dashboard-main">

      <ProfileSetupReminder />

      {canShowDashboardContent && (
        <>
          <AppointmentReminder userId={user?.user?._id} />
          <PsychologistRecommendations />
        </>
      )}
    </section>
  );
}
