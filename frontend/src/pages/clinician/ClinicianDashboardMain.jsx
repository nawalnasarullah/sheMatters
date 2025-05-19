import React from 'react'
import { useSelector } from "react-redux";
import { Card, CardContent } from "@mui/material";
import {
    Button,
    Typography,
  } from "@mui/material";
import { Link } from "react-router-dom";
import ClinicianProfileSetupReminder from './ClinicianProfileSetupReminder';
import AppointmentReminder from '../../components/AppointmentReminder';

export default function ClinicianDashboardMain() {

  const {psychologist} = useSelector(state => state.psychologistAuth);
 
  

  return (
    <section className='user-dashboard-main '>
      <AppointmentReminder userId={psychologist?._id} />
    </section>
  )
}