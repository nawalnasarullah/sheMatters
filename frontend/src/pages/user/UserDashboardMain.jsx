import React from "react";
import ProfileSetupReminder from "./ProfileSetupReminder";
import PsychologistRecommendations from "./PsychologistRecommendations";

export default function UserDashboardMain() {
  return (
    <section className="user-dashboard-main">
      <ProfileSetupReminder />
      <PsychologistRecommendations />
    </section>
  );
}
