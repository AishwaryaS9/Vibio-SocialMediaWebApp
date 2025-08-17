import express from "express";
import { Webhook } from "svix";
import { inngest } from "../inngest/index.js";

const router = express.Router();

// Clerk webhook
router.post("/clerk", express.raw({ type: "application/json" }), async (req, res) => {
  try {
    const payload = req.body;
    const headers = req.headers;

    const svix_id = headers["svix-id"];
    const svix_timestamp = headers["svix-timestamp"];
    const svix_signature = headers["svix-signature"];

    if (!svix_id || !svix_timestamp || !svix_signature) {
      return res.status(400).json({ error: "Missing svix headers" });
    }

    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
    const evt = wh.verify(payload, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    });

    // Forward event to Inngest
    await inngest.send({
      name: `clerk/${evt.type}`,
      data: evt.data,
    });

    res.status(200).json({ success: true });
  } catch (err) {
    console.error("Webhook error:", err.message);
    res.status(400).json({ error: err.message });
  }
});

export default router;
