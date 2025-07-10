import express from "express";
import PaymentController from "../controllers/payment.controller.js";

const router = express.Router();
const payment = new PaymentController();

router.post("/webhook", express.raw({ type: "application/json" }), payment.handleStripeWebhook);

export default router;
