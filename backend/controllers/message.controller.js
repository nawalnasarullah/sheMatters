import { Message } from "../models/message.model.js";
import { v2 as cloudinary } from "cloudinary";
import { io, getReceiverSocketId } from "../config/socket.js";
import { Appointment } from "../models/appointment.model.js";
export default class MessageController {
async getUsersForSidebar(req, res, next) {
  try {
    const { _id, role } = req.user;

    if (role === "user") {
      let psychologists = await Appointment
        .find({ userId: _id })
        .populate({
          path: "psychologistId",
          select: "_id firstName lastName username avatar",
        })
        .select("psychologistId");

      // Filter out appointments where psychologistId is null
      psychologists = psychologists
        .filter((psy) => psy.psychologistId)
        .map((psy) => psy.psychologistId);

      return res.json(psychologists);
    } 
    
    else if (role === "psychologist") {
      let users = await Appointment
        .find({ psychologistId: _id })
        .populate({
          path: "userId",
          select: "_id firstName lastName username avatar",
        })
        .select("userId");

      // Filter out appointments where userId is null
      users = users
        .filter((user) => user.userId)
        .map((user) => user.userId);

      return res.json(users);
    } 
    
    else {
      return res.status(400).json({ error: "Invalid user role" });
    }
  } catch (err) {
    next(err);
  }
}


  async getMessages(req, res, next) {
    try {
      const { id: userToChatId } = req.params;
      const myId = req.user._id;

      // const messages = await Message.findOne({
      //         $or: [
      //             { senderId: myId, receiverId: userToChatId },
      //             { senderId: userToChatId, receiverId: myId },
      //         ],
      //     })

      const messages = await Message.find({
        $or: [
          { senderId: myId, receiverId: userToChatId },
          { senderId: userToChatId, receiverId: myId },
        ],
      }).sort({ createdAt: 1 });

      res.status(200).json(messages);
    } catch (err) {
      next(err);
    }
  }

  async sendMessage(req, res, next) {
    console.log("Sending message");

    try {
      const { message, image } = req.body;
      const { id: receiverId } = req.params;
  

      const senderId = req.user._id;
      const senderModel = req.user.role;

      const receiverModel = senderModel === "user" ? "psychologist" : "user";

      let imageUrl;

      // if (image) {
      //   const uploadResponse = await cloudinary.uploader.upload(image);
      //   imageUrl = uploadResponse.secure_url;
      // }

      try {
  if (image) {
    const uploadResponse = await cloudinary.uploader.upload(image);
    imageUrl = uploadResponse.secure_url;
  }
} catch (uploadErr) {
  return res.status(500).json({ message: "Image upload failed", error: uploadErr.message });
}

      

      const newMessage = await Message.create({
        senderId,
        senderModel,
        receiverId,
        receiverModel,
        message,
        image: imageUrl || null,
      });

      await newMessage.save();

      try {
        const receiverSocketId = getReceiverSocketId(receiverId);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("newMessage",newMessage);
        console.log("Message sent to receiver:", receiverSocketId);
      }
      } catch (error) {
        console.error("Error sending message to receiver:", error);
      }

      res.status(201).json(newMessage);
    } catch (err) {
      next(err);
    }
  }
}
