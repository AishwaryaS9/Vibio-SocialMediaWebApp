import express from "express";
import { inngest } from "../inngest/index.js";

const router = express.Router();

router.post("/clerk", express.raw({ type: "application/json" }), async (req, res) => {
  try {
    const payload = req.body;
    const eventType = payload.type;

    // Send event into Inngest
    await inngest.send({
      name: `clerk/${eventType}`, 
      data: payload.data,
    });

    res.status(200).json({ success: true });
  } catch (err) {
    console.error("Webhook error:", err);
    res.status(400).json({ error: err.message });
  }
});

export default router;
