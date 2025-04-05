const express = require('express');
const app = express();


app.use(express.json());


const parkRouter = require("./routes/park");
const pickupRouter = require("./routes/pickup");
const searchRouter = require("./routes/search");


app.use("/park", parkRouter);
app.use("/pickup", pickupRouter);
app.use("/search", searchRouter);


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`App running on port: ${PORT} 🚀`);
});