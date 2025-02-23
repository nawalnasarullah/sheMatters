import nodemailer from "nodemailer";
import cron from "node-cron";
import Appointment from "../models/Appointment"; // Adjust this based on your DB setup
import User from "../models/User";

// Configure email transport
const transporter = nodemailer.createTransport({
  service: "gmail", // Or use another email provider
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Function to send email
const sendEmailReminder = async (appointment) => {
  try {
    const user = await User.findById(appointment.userId);
    if (!user || !user.email) return;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Appointment Reminder",
      text: `Reminder: You have an appointment scheduled on ${appointment.slotDate} at ${appointment.slotTime}.`,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${user.email}`);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

// Cron Job to Check Appointments
cron.schedule("* * * * *", async () => {
  try {
    const now = new Date();
    const upcomingAppointments = await Appointment.find({
      slotDate: { $gte: now.toISOString().split("T")[0] },
    });

    upcomingAppointments.forEach((appointment) => {
      const appointmentTime = new Date(
        `${appointment.slotDate} ${appointment.slotTime}`
      );
      const timeDiff = appointmentTime - now;

      if (timeDiff > 0 && timeDiff <= 10 * 60 * 1000) {
        sendEmailReminder(appointment);
      }
    });
  } catch (error) {
    console.error("Error checking appointments:", error);
  }
});
