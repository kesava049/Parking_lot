const express = require("express");
const cors = require("cors");
require("dotenv").config();

const parkRouter = require("./routes/parking");
const pickupRouter = require("./routes/pickup");
const searchRouter = require("./routes/search");
const paymentRoutes = require("./routes/payment");


const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/", parkRouter);
app.use("/api/pickup", pickupRouter);
app.use("/api/search", searchRouter);
app.use("/api/payment", paymentRoutes);


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`App running on port: ${PORT} 🚀`);
});

