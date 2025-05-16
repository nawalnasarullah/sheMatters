import express from "express";
const router = express.Router();
import { protectRoute } from "../middleware/protectRoute.js";
import messageController from "../controllers/message.controller.js";

const message = new messageController();

console.log("Message routes loaded");


router.route('/users').get(protectRoute, message.getUsersForSidebar);
router.route('/send/:id').post(protectRoute, message.sendMessage);
router.route('/:id').get(protectRoute, message.getMessages);


export default router;