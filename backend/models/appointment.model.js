import mongoose from "mongoose";

const appointmentSchema = mongoose.Schema({
  psychologistId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Psychologist",
    required: true,
  },
  user: {
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
    enum: ["booked", "available"], 
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

appointmentSchema.pre('save', function(next) {
  const durationInHours = (this.endTime - this.startTime) / (1000 * 60 * 60);
  if (durationInHours > 2) {
    next(new Error('Appointment duration cannot exceed 2 hours'));
  }
  next();
});

export const Appointment = mongoose.model("appointment", appointmentSchema);
