import express from "express";
const router = express.Router();
import appointmentController from "../controllers/appointment.controller.js";

const appointment = new appointmentController();

router.route('/appointment/book').post(appointment.bookAnAppointment);
router.route('/appointment/all').get(appointment.getAllAppointments);
router.route('/appointment/:userId').get(appointment.getAppointmentById);
router.route('/appointment/cancel/:appointmentId').delete(appointment.cancelAppointment);
router.route('/appointment/complete/:appointmentId').patch(appointment.markAppointmentCompleted);

export default router;