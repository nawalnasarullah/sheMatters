import express from "express";
const router = express.Router();
import Auth from "../controllers/admin.controller.js";
import { checkToken } from "../middleware/checkToken.js";
import { isUserAuthenticated } from "../middleware/auth.js";

const adminController = new Auth();

router.route('/admin/register').post(adminController.signUp);
router.route('/admin/login').post(adminController.login);
router.route('/admin/logout').get(adminController.logout);
router.route('/admin/forgotPassword').post(adminController.forgotPassword);
router.route('/admin/resetPassword').post(checkToken, adminController.resetPassword);
router.route('/admin/me').get(isUserAuthenticated, adminController.getMe)

export default router;