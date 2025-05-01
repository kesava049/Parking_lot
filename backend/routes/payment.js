const express = require("express");
const Razorpay = require("razorpay");
require("dotenv").config();

const router = express.Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET_KEY,
});

router.post("/order", async (req, res) => {
    try {
      const amount = Math.round(Number(req.body.amount));
      if (!amount || amount < 100) {
        return res.status(400).json({ error: "Amount must be at least ₹1 (100 paise)" });
      }
  
      const options = {
        amount, // in paise
        currency: "INR",
        receipt: `receipt_${Date.now()}`,
      };
  
      const order = await razorpay.orders.create(options);
  
      console.log("✅ Razorpay order created:", order);
      res.status(200).json({ success: true, order });
    } catch (error) {
      console.error("❌ Razorpay Error:", error);
  
      const status = error.statusCode || 500;
      const msg = error?.error?.description || error.message;
  
      res.status(status).json({
        success: false,
        error: {
          message: msg,
          code: error?.error?.code || "UNKNOWN",
          stack: error.stack,
        },
      });
    }
  });

module.exports = router;