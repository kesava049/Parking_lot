const express = require("express");
const Razorpay = require("razorpay");
const crypto = require("crypto");

const router = express.Router();

// ✅ Initialize Razorpay instance
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID, 
    key_secret: process.env.RAZORPAY_SECRET_KEY,
  });

  router.post("/order", async (req, res) => {
    try {
      const { amount } = req.body;
  
      if (!amount || amount < 1) {  // ✅ Ensure amount is at least ₹1
        return res.status(400).json({ success: false, error: "Amount must be at least ₹1" });
      }
  
      const options = {
        amount: amount * 100, // Convert to paise
        currency: "INR",
        receipt: crypto.randomBytes(10).toString("hex"),
      };
  
      const order = await razorpay.orders.create(options);
      res.status(200).json({ success: true, order });
    } catch (error) {
      console.error("❌ Payment Error:", error);
      res.status(500).json({ success: false, error: error.message || "Payment failed" });
    }
  });

module.exports = router;