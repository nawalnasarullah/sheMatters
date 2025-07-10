import express from "express";
import PaymentController from "../controllers/payment.controller.js";

const router = express.Router();
const payment = new PaymentController();

router.post("/create-checkout-session", payment.createCheckoutSession);

export default router;
