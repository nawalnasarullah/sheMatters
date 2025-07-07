import mongoose from "mongoose";

const callRecordSchema = new mongoose.Schema(
  {
    callerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "callerModel",
    },
    callerModel: {
      type: String,
      required: true,
      enum: ["user", "psychologist"],
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "receiverModel",
    },
    receiverModel: {
      type: String,
      required: true,
      enum: ["user", "psychologist"],
    },
    callType: {
      type: String,
      enum: ["audio", "video"],
      default: "video",
    },
    startedAt: Date,
    endedAt: Date,
    duration: Number, // in seconds
  },
  { timestamps: true }
);

export const CallRecord = mongoose.model("CallRecord", callRecordSchema);
