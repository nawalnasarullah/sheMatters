import express from "express";
const router = express.Router();
import protectRoute from "../middleware/protectRoute.js";
import messageController from "../controllers/message.controller.js";

const message = new messageController();

router.route('/usersOnChat').get(protectRoute, message.getUsersForSidebar);
router.route('/:id/getMessages').get(protectRoute, message.getMessages);
router.route(':id/sendMessage').post(protectRoute, message.sendMessage);

export default router;