import express from "express";
const router = express.Router();
import appointmentController from "../controllers/appointment.controller.js";

const appointment = new appointmentController();

router.route('/appointment/book').post(appointment.bookAnAppointment);

export default router;