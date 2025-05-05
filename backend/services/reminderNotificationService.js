import nodemailer from "nodemailer";
import cron from "node-cron";
import { Appointment } from "../models/appointment.model.js";
import { User } from "../models/user.model.js";

const transporter = nodemailer.createTransport({
  service: "gmail", // You can change this if using another email provider
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmailReminder = async (appointment) => {
  try {
   
    const user = await User.findById(appointment.userId);
    if (!user || !user.email) {
      console.log(`User not found or email missing for appointment ${appointment._id}`);
      return;
    }


    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Appointment Reminder",
      text: `Hello ${user.firstName},\n\nThis is a reminder that you have an appointment scheduled on ${appointment.slotDate} at ${appointment.slotTime}.\n\nPlease be on time.\n\nBest regards,\nYour Appointment Team`,
    };

    // Send email
    await transporter.sendMail(mailOptions);
    console.log(`Email reminder sent to ${user.email}`);
  } catch (error) {
    console.error("Error sending email reminder:", error);
  }
};

// Cron Job to check upcoming appointments every minute
cron.schedule("* * * * *", async () => {
  try {
    console.log("Checking for upcoming appointments...");

    const now = new Date();
    const today = now.toISOString().split("T")[0]; // Get current date (YYYY-MM-DD)

    // Find appointments scheduled today or in the future that are not cancelled or completed
    const upcomingAppointments = await Appointment.find({
      slotDate: { $gte: today }, // Fetch today's and future appointments
      cancelled: false, // Exclude cancelled appointments
      isCompleted: false, // Exclude completed appointments
    });

    // Loop through appointments and send reminders
    for (const appointment of upcomingAppointments) {
      const appointmentTime = new Date(`${appointment.slotDate} ${appointment.slotTime}`);
      const timeDiff = appointmentTime - now;

      if (timeDiff > 0 && timeDiff <= 10 * 60 * 1000) { // Send reminder 10 minutes before
        await sendEmailReminder(appointment);
      }
    }
  } catch (error) {
    console.error("Error checking appointments:", error);
  }
});

// const testReminder = async () => {
//   console.log("Triggering test reminder...");
//   const appointment = await Appointment.findOne(); // Fetch one appointment from DB

//   if (appointment) {
//     await sendEmailReminder(appointment);
//   } else {
//     console.log("No appointments found for testing.");
//   }
// };

// testReminder();

