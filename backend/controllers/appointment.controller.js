import { Appointment } from "../models/appointment.model.js";
import { Psychologist } from "../models/psychologist.model.js";
import { User } from "../models/user.model.js";

export default class AppointmentController {
  async bookAnAppointment(req, res, next) {
    try {
      const { psychologistId, userId, slotDate, slotTime } = req.body;

      const psychologistData = await Psychologist.findById(
        psychologistId
      ).select("-password");

      if (!psychologistData) {
        return res
          .status(404)
          .json({ message: "Psychologist not found", success: false });
      }

      if (!psychologistData.available) {
        return res
          .status(403)
          .json({
            message: "Psychologist is not available at this time",
            success: false,
          });
      }

      let slots_booked = psychologistData.slots_booked || {};

      // Checking slot availability
      if (slots_booked[slotDate]?.includes(slotTime)) {
        return res
          .status(403)
          .json({
            message: "Slot already booked",
            success: false,
            status: "booked",
          });
      }

      // Booking the slot
      slots_booked[slotDate] = slots_booked[slotDate] || [];
      slots_booked[slotDate].push(slotTime);

      const userData = await User.findById(userId).select("-password");
      if (!userData) {
        return res
          .status(404)
          .json({ message: "User not found", success: false });
      }

      delete psychologistData.slots_booked;

      const appointmentData = {
        userId,
        psychologistId,
        psychologistData,
        userData,
        slotDate,
        slotTime,
        amount: psychologistData.fee,
        date: Date.now(),
      };

      const newAppointment = new Appointment(appointmentData);
      await newAppointment.save();

      // Saving new slot data
      await Psychologist.findByIdAndUpdate(psychologistId, { slots_booked });
      console.log("slots_booked", slots_booked);

      res.json({
        message: "Appointment Booked Successfully",
        success: true,
        status: "booked",
        available: false,
      });
    } catch (err) {
      next(err);
    }
  }

  async getAllAppointments(req, res, next) {
    try {
      const appointments = await Appointment.find()
      res.json({
        appointments,
        message: "All appointments retrieved successfully",
        success: true,
      });
    } catch (err) {
      next(err);
    }
  }

  async getAppointmentById(req, res, next) {
    try {
      const { id } = req.params;
      const appointment = await Appointment.findById(id)

      if (!appointment) {
        return res
          .status(404)
          .json({ message: "Appointment not found", success: false });
      }

      res.json({
        appointment,
        message: "Appointment retrieved successfully",
        success: true,
      });
    } catch (err) {
      next(err);
    }
  }
}
