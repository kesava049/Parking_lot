const express = require("express");
const router = express.Router();
const { VehicleParking } = require("../db/schema");

router.post("/park", async (req, res) => {
    console.log("Received POST request:", req.body);

    const { vehicleType, numberPlate } = req.body;

    if (!vehicleType || !numberPlate) {
        return res.status(400).json({ msg: "❌ Vehicle type and number plate are required!" });
    }

    try {
       
        const existingVehicle = await VehicleParking.findOne({ numberPlate, isPickedUp: false });

        if (existingVehicle) {
            return res.status(400).json({ 
                msg: `❌ Vehicle with plate number ${numberPlate} is already parked!` 
            });
        }

        
        let startTime = new Date();
        await VehicleParking.create({ vehicleType, numberPlate, startTime, isPickedUp: false });

        res.status(200).json({
            message: `✅ ${vehicleType} with plate ${numberPlate} parked successfully!`
        });
    } catch (error) {
        console.error("Error inserting vehicle:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;