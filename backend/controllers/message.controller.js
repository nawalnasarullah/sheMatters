import { Message } from "../models/message.model.js";
import { User } from "../models/user.model.js";
import { Psychologist } from "../models/psychologist.model.js";
import { v2 as cloudinary } from "cloudinary";

export default class MessageController {
  async getUsersForSidebar(req, res, next) {
  
    try {
      const { _id, role } = req.user;

      if (role === "user") {
        const psychologists = await Psychologist.find({
          _id: { $ne: _id },
        }).select("-password");
        return res.json(psychologists);
      } else if (role === "psychologist") {
        const users = await User.find({ _id: { $ne: _id } }).select(
          "-password"
        );
        return res.json(users);
      } else {
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
      console.log(receiverId);
      
      const senderId = req.user._id;
      const senderModel = req.user.role;

      const receiverModel = senderModel === 'user' ? 'psychologist' : 'user';

      let imageUrl;

      if (image) {
        const uploadResponse = await cloudinary.uploader.upload(image);
        imageUrl = uploadResponse.secure_url;
      }

      console.log(
        senderId,
  receiverId,
  message,
  image,
      );
      

      const newMessage = await Message.create({
        senderId,
        senderModel,
        receiverId,
        receiverModel,
        message,
        image: imageUrl || null,
      });

      
      

      await newMessage.save();
      console.log("Message saved:", newMessage);

      res.status(201).json(newMessage);
    } catch (err) {
      next(err);
    }
  }
}
