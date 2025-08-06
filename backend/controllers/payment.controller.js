import Stripe from "stripe";
import { Psychologist } from "../models/psychologist.model.js";
import { Appointment } from "../models/appointment.model.js";
import { User } from "../models/user.model.js";
import { sendBookingConfirmation } from "../services/reminderNotificationService.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
export default class PaymentController {
  async createCheckoutSession(req, res, next) {
    try {
      const { psychologistId, userId, slotDate, slotTime } = req.body;

      const psychologist = await Psychologist.findById(psychologistId);
      if (!psychologist) {
        return res.status(404).json({ message: "Psychologist not found" });
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        line_items: [
          {
            price_data: {
              currency: "pkr",
              unit_amount: psychologist.fee * 100, // PKR to paisa
              product_data: {
                name: `SheMatters Consultation with Dr. ${psychologist.firstName}`,
                description: `1-on-1 virtual mental health appointment`,
              },
            },
            quantity: 1,
          },
        ],
        metadata: {
          psychologistId,
          userId,
          slotDate,
          slotTime,
        },
        // success_url: `${process.env.CLIENT_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
        // cancel_url: `${process.env.CLIENT_URL}/payment-cancelled`,
        success_url: `https://shematters.netlify.app/payment-success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `https://shematters.netlify.app/payment-cancelled`,
      });

      res.status(200).json({ url: session.url });
    } catch (err) {
      next(err);
    }
  }

  async handleStripeWebhook(req, res) {
    console.log("Received Stripe webhook event");
    const sig = req.headers["stripe-signature"];
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

    let event;
    try {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
      console.error("Webhook error:", err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const { psychologistId, userId, slotDate, slotTime } = session.metadata;

      try {
        const psychologistData = await Psychologist.findById(
          psychologistId
        ).select("-password");
        if (!psychologistData)
          return res.status(404).json({ message: "Psychologist not found" });

        if (!psychologistData.available)
          return res
            .status(403)
            .json({ message: "Psychologist not available" });

        let slots_booked = psychologistData.slots_booked || {};
        if (slots_booked[slotDate]?.includes(slotTime))
          return res.status(403).json({ message: "Slot already booked" });

        slots_booked[slotDate] = slots_booked[slotDate] || [];
        slots_booked[slotDate].push(slotTime);

        const userData = await User.findById(userId).select("-password");
        if (!userData)
          return res.status(404).json({ message: "User not found" });

        delete psychologistData.slots_booked;

        const appointmentData = {
          userId,
          psychologistId,
          psychologistData,
          userData,
          slotDate,
          slotTime,
          amount: psychologistData.fee,
          date: Date.now(),
          status: "booked",
          payment: true,
        };

        const newAppointment = new Appointment(appointmentData);
        await newAppointment.save();

        await sendBookingConfirmation(newAppointment);
        await Psychologist.findByIdAndUpdate(psychologistId, { slots_booked });
        await Psychologist.findByIdAndUpdate(psychologistId, {
          $addToSet: { assignedPatients: userId },
        });

        console.log("Webhook: appointment created & slot booked");
        res.status(200).json({ received: true });
      } catch (err) {
        console.error("Webhook logic error:", err.message);
        res.status(500).json({ message: "Internal error" });
      }
    } else {
      res.status(200).json({ received: true });
    }
  }
}
