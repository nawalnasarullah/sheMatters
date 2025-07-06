import mongoose from "mongoose";
const { Schema } = mongoose;

const messageSchema = new Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "senderModel", 
    },
    senderModel: {
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
    message: {
      type: String,
    },
    image: {
        type: String,
        default: null,
    }
  },
  { timestamps: true }
);

export const Message = mongoose.model("message", messageSchema);
