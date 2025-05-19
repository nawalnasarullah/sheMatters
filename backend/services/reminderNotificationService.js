import nodemailer from "nodemailer";
import cron from "node-cron";
import { Appointment } from "../models/appointment.model.js";
import { User } from "../models/user.model.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmailReminder = async (appointment) => {
  try {
    const user = await User.findById(appointment.userId);
    if (!user || !user.email) {
      console.log(
        `User not found or email missing for appointment ${appointment._id}`
      );
      return;
    }

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Appointment Reminder",
      html: `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <style>
          body {
            font-family: 'Signika', 'sans-serif';
            background-color: #f8f8f8;
            margin: 0;
            padding: 0;
            color: #000000;
          }
          .container {
            max-width: 600px;
            margin: auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.06);
          }
          .header {
            background-color: #005c65;
            color: #ffffff;
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
            <h2>Appointment Reminder</h2>
          </div>
          <div class="content">
            <p>Hello <span class="highlight">${user.firstName}</span>,</p>
            <p>
              This is a friendly reminder that you have an appointment scheduled on 
              <span class="highlight">${appointment.slotDate}</span> at 
              <span class="highlight">${appointment.slotTime}</span>.
            </p>
            <p>Please make sure to be on time.</p>
            <p>Best regards,<br>Your Appointment Team</p>
          </div>
          <div class="footer">
            This is an automated message. Please do not reply to this email.
          </div>
        </div>
      </body>
    </html>
  `,
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
    const today = now.toISOString().split("T")[0]; 

   
    const upcomingAppointments = await Appointment.find({
      slotDate: { $gte: today }, 
      cancelled: false, 
      isCompleted: false, 
    });

    for (const appointment of upcomingAppointments) {
      const appointmentTime = new Date(
        `${appointment.slotDate} ${appointment.slotTime}`
      );
      const timeDiff = appointmentTime - now;

      if (timeDiff > 0 && timeDiff <= 10 * 60 * 1000) {

        await sendEmailReminder(appointment);
      }
    }
  } catch (error) {
    console.error("Error checking appointments:", error);
  }
});
