const express = require("express");
const cors = require("cors");
const parkingRoutes = require("./routes/parking"); // ✅ Import route

const app = express();

app.use(cors()); // ✅ Fix CORS issue
app.use(express.json()); // ✅ Parse JSON requests

app.use("/api", parkingRoutes); // ✅ Route now prefixed with /api


const parkRouter = require("./routes/parking");
const pickupRouter = require("./routes/pickup");
const searchRouter = require("./routes/search");

app.use("/park", parkRouter);
app.use("/pickup", pickupRouter);
app.use("/search", searchRouter);


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`App running on port: ${PORT} 🚀`);
});