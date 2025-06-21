import cron from "node-cron";
import nodemailer from "nodemailer";
import { Appointment } from "../models/appointment.model.js";
import { parseTime12Hour } from "./helperFunctions.js";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendMail = async ({ to, subject, html }) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    html,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${to}: ${subject}`);
  } catch (err) {
    console.error("Error sending email:", err);
  }
};


const generateEmailHtml = ({ title, greeting, body }) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: 'Signika', sans-serif;
      background-color: #f8f8f8;
      margin: 0;
      padding: 0;
      color: #000;
    }
    .container {
      max-width: 600px;
      background-color: white;
      margin: 30px auto;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
    .header {
      background-color: #005c65;
      color: white;
      padding: 20px;
      text-align: center;
    }
    .content {
      padding: 20px;
      color: #333;
      line-height: 1.6;
    }
    .footer {
      padding: 10px;
      font-size: 12px;
      text-align: center;
      color: #aaa;
      background-color: #f9f9f9;
    }
    .highlight {
      color: #005c65;
      font-weight: bold;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>${title}</h2>
    </div>
    <div class="content">
      <p>${greeting}</p>
      <p>${body}</p>
      <p>Best regards,<br/><span class="highlight">SheMatters Team</span></p>
    </div>
    <div class="footer">
      This is an automated message. Please do not reply.
    </div>
  </div>
</body>
</html>
`;

export const sendBookingConfirmation = async (appointment) => {
  const { userData, psychologistData, slotDate, slotTime } = appointment;

  const html = generateEmailHtml({
    title: "Appointment Booked",
    greeting: `Hello ${userData.firstName || "there"},`,
    body: `Your appointment with <strong>${psychologistData.firstName}</strong> is confirmed for 
           <strong>${slotDate}</strong> at <strong>${slotTime}</strong>. We're excited to see you!`,
  });

  await sendMail({
    to: userData.email,
    subject: "Appointment Booked",
    html,
  });

  const psychologistHtml = generateEmailHtml({
    title: "New Appointment Scheduled",
    greeting: `Hello ${psychologistData.firstName || "there"},`,
    body: `You have a new appointment with <strong>${userData.firstName}</strong> scheduled for 
           <strong>${slotDate}</strong> at <strong>${slotTime}</strong>. Please be prepared.`,
  });

  await sendMail({
    to: psychologistData.email,
    subject: "New Appointment Scheduled",
    html: psychologistHtml,
  });
};

const checkAppointments = async () => {
  const now = new Date();
  const appointments = await Appointment.find({
    isCompleted: false,
    status: "booked",
  });

  for (const appointment of appointments) {
    const { hours, minutes } = parseTime12Hour(appointment.slotTime);
    const appointmentTime = new Date(appointment.slotDate);
    appointmentTime.setHours(hours, minutes, 0, 0);

    const diffMinutes = Math.floor((appointmentTime - now) / (1000 * 60));


    if (diffMinutes === 10 && !appointment.reminderSent) {
      const html = generateEmailHtml({
        title: "Appointment Reminder",
        greeting: `Hi ${appointment.userData.firstName || "there"},`,
        body: `This is a friendly reminder that your appointment is in <strong>10 minutes</strong> at 
               <strong>${appointment.slotTime}</strong> on <strong>${appointment.slotDate}</strong>.`,
      });

      await sendMail({
        to: appointment.userData.email,
        subject: "Appointment Reminder",
        html,
      });

      appointment.reminderSent = true;
      await appointment.save();
    }

    if (
      now > appointmentTime &&
      !appointment.isCompleted &&
      !appointment.isMissed
    ) {
      appointment.status = "missed";
      appointment.isMissed = true;
      await appointment.save();

      const html = generateEmailHtml({
        title: "Missed Appointment",
        greeting: `Hello ${appointment.userData.firstName || "there"},`,
        body: `It looks like you missed your appointment on <strong>${appointment.slotDate}</strong> 
               at <strong>${appointment.slotTime}</strong>. You can reschedule it on our website.`,
      });

      await sendMail({
        to: appointment.userData.email,
        subject: "Missed Appointment",
        html,
      });
    }
  }
};

cron.schedule("* * * * *", async () => {
  await checkAppointments();
  // console.log("Checked appointment reminders & missed status...");
});
