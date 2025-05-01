const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const parkRouter = require("./routes/parking");
const pickupRouter = require("./routes/pickup");
const searchRouter = require("./routes/search");
const paymentRouter = require("./routes/payment");
const authRouter = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", parkRouter);
app.use("/api/pickup", pickupRouter);
app.use("/api/search", searchRouter);
app.use("/api/payment", paymentRouter);
app.use("/api/auth", authRouter);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    const port = process.env.PORT || 3000;
    app.listen(port, () =>
      console.log(`✅ Server running at http://localhost:${port}`)
    );
  })
  .catch((err) => console.error("❌ MongoDB connection failed:", err));