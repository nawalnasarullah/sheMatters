import nodemailer from "nodemailer";
import cron from "node-cron";
import { Appointment } from "../models/appointment.model.js";
import { User } from "../models/user.model.js";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";

dayjs.extend(utc);
dayjs.extend(timezone);


if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  throw new Error("Missing EMAIL_USER or EMAIL_PASS in environment variables.");
}


const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Send email for missed appointments
const sendMissedAppointmentEmail = async (appointment) => {
  try {
    const user = await User.findById(appointment.userId);
    if (!user?.email) return;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Missed Appointment Notification",
      html: generateEmailHtml(user.firstName, appointment.slotDate, appointment.slotTime, true),
    };

    await transporter.sendMail(mailOptions);
    console.log(`Missed appointment email sent to ${user.email}`);
  } catch (error) {
    console.error("Error sending missed appointment email:", error);
  }
};

// Send reminder emails
const sendEmailReminder = async (appointment) => {
  try {
    const user = await User.findById(appointment.userId);
    if (!user?.email) {
      console.log(`User not found or email missing for appointment ${appointment._id}`);
      return;
    }

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Appointment Reminder",
      html: generateEmailHtml(user.firstName, appointment.slotDate, appointment.slotTime, false),
    };

    await transporter.sendMail(mailOptions);
    console.log(`Email reminder sent to ${user.email}`);
  } catch (error) {
    console.error("Error sending email reminder:", error);
  }
};


const generateEmailHtml = (firstName, date, time, missed) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
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
      margin: auto;
      background-color: #fff;
      border-radius: 8px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.06);
    }
    .header {
      background-color: #005c65;
      color: #fff;
      padding: 20px;
      text-align: center;
    }
    .content {
      padding: 30px 20px;
      font-size: 14px;
      line-height: 1.6;
    }
    .highlight {
      color: #005c65;
      font-weight: bold;
    }
    .footer {
      background-color: #FCEAEA;
      color: #aaa;
      text-align: center;
      padding: 10px;
      font-size: 12px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>${missed ? "You MISSED your appointment" : "Appointment Reminder"}</h2>
    </div>
    <div class="content">
      <p>Hello <span class="highlight">${firstName}</span>,</p>
      <p>
        ${missed
          ? `This is a reminder that you <strong>missed</strong> your appointment scheduled on`
          : "This is a friendly reminder that you have an appointment scheduled on"}
        <span class="highlight">${date}</span> at <span class="highlight">${time}</span>.
      </p>
      <p>${missed ? "Please visit our web app to reschedule." : "Please make sure to be on time."}</p>
      <p>Best regards,<br>Your Appointment Team</p>
    </div>
    <div class="footer">
      This is an automated message. Please do not reply to this email.
    </div>
  </div>
</body>
</html>
`;

// Cron job
cron.schedule("* * * * *", async () => {
  try {
    const now = new Date();
    const today = dayjs().tz("Asia/Kolkata").format("YYYY-MM-DD");

    const appointments = await Appointment.find({
      slotDate: { $gte: today },
      cancelled: false,
      isCompleted: false,
    });

    for (const appointment of appointments) {
      if (!appointment.slotDate || !appointment.slotTime) {
        console.warn(`Invalid slot date/time for appointment ${appointment._id}`);
        continue;
      }

      const appointmentTime = dayjs
        .tz(`${appointment.slotDate} ${appointment.slotTime}`, "Asia/Kolkata")
        .toDate();

      const timeDiff = appointmentTime - now;

 
      if (timeDiff > 0 && timeDiff <= 10 * 60 * 1000) {
        await sendEmailReminder(appointment);
      }

   
      if (timeDiff < -10 * 60 * 1000) {
        appointment.cancelled = true;
        appointment.status = "missed";
        await appointment.save();
        await sendMissedAppointmentEmail(appointment);
        console.log(`Appointment ${appointment._id} marked as missed.`);
      }
    }
  } catch (error) {
    console.error("Error checking appointments:", error);
  }
});
