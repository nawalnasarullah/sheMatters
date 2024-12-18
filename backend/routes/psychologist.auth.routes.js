import express from "express";
const router = express.Router();
import psychologistAuth from "../controllers/psychologist.auth.controller.js";
import { checkToken } from "../middleware/checkToken.js";

const psychologistAuthController = new psychologistAuth();

router.route('/psychologist/auth/register').post(psychologistAuthController.signUp);
router.route('/psychologist/auth/login').post(psychologistAuthController.login);
router.route('/psychologist/auth/logout').get(psychologistAuthController.logout);
router.route('/psychologist/auth/forgotPassword').post(psychologistAuthController.forgotPassword);
router.route('/psychologist/auth/resetPassword').post(checkToken, psychologistAuthController.resetPassword);


export default router;