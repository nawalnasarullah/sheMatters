import express from "express";
const router = express.Router();
import userController from "../controllers/user.controller.js";
import { isUserAuthenticated } from "../middleware/auth.js";

const user = new userController();

router.route('/user/all').get(user.getAllUsers);
router.route('/user/delete').delete(user.deleteUser);
router.route('/me').get(isUserAuthenticated, user.getMe)
router.route('/user/assign-labels').patch(user.assignLabels);
router.route('/user/:id').get(user.getUserById);

export default router;