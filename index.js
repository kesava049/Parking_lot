const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const parkRouter = require("./routes/parking");
const pickupRouter = require("./routes/pickup");
const searchRouter = require("./routes/search");
const paymentRoutes = require("./routes/payment");
const authRoutes = require("./routes/authRoutes"); 

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/", parkRouter);
app.use("/api/pickup", pickupRouter);
app.use("/api/search", searchRouter);
app.use("/api/payment", paymentRoutes);
app.use("/api/auth", authRoutes); 

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () =>
      console.log(`Server running on http://localhost:${process.env.PORT}`)
    );
  })
  .catch((err) => console.error('MongoDB connection error:', err));

