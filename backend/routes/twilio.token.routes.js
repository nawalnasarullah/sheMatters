import twilio from 'twilio';
import express from 'express';
const router = express.Router();
import 'dotenv/config'

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

router.post("/make-call", async (req, res) => {
  const { to } = req.body;

  try {
    const call = await client.calls.create({
      from: process.env.TWILIO_PHONE_NUMBER,
      to,
      url: "http://demo.twilio.com/docs/voice.xml",
    });

    res.status(200).json({ sid: call.sid });
  } catch (error) {
    console.error("Call failed", error);
    res.status(500).json({ error: error.message });
  }
});

export default router;