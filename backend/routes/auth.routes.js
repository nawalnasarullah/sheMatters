import express from "express";
const router = express.Router();
import Auth from "../controllers/auth.controller.js";
import { isUserAuthenticated } from "../middleware/auth.js";
import { checkToken } from "../middleware/checkToken.js";

const authController = new Auth();

router.route('/auth/register').post(authController.signUp);
router.route('/auth/login').post(authController.login);
router.route('/auth/logout').get(authController.logout);
router.route('/auth/forgotPassword').post(authController.forgotPassword);
router.route('/auth/resetPassword').post(checkToken, authController.resetPassword);


export default router;