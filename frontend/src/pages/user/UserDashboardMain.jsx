import React from "react";
import ProfileSetupReminder from "./ProfileSetupReminder";
import PsychologistRecommendations from "./PsychologistRecommendations";
import AppointmentReminder from "../../components/AppointmentReminder";
import {useSelector} from "react-redux";

export default function UserDashboardMain() {

  const { user} = useSelector(state => state.auth);
  return (
    <section className="user-dashboard-main">
      <ProfileSetupReminder />
      <AppointmentReminder userId={user?.user?._id}/>
      <PsychologistRecommendations />
    </section>
  );
}
