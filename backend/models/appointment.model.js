import mongoose from "mongoose";

const appointmentSchema = mongoose.Schema({
  psychologistId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Psychologist",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  slotTime: {
    type: String,
    required: true
  },
  slotDate: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ["booked", "available", "missed", "cancelled", "completed"], 
    default: "available" 
  },
  date : {
    type: Number,
    required: true,
  },
  psychologistData : {
    type: Object,
    required: true
  },
  userData : {
    type: Object,
    required: true
  },
  cancelled: {
    type: Boolean,
    default: false
  },
  payment: {
    type: Boolean,
    default: false
  }, 
  isCompleted: {
    type: Boolean,
    default: false
  }
});



export const Appointment = mongoose.model("appointment", appointmentSchema);
