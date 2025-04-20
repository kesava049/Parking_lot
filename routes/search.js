const { Router } = require("express");
const router = Router();
const { VehicleParking } = require("../db/schema");

router.get("/", async (req, res) => {
    const { numberPlate } = req.query; 

    if (!numberPlate) {
        return res.status(400).json({ msg: "❌ Number Plate is required!" });
    }

    try {
        const vehicle = await VehicleParking.findOne({ numberPlate });

        if (!vehicle) {
            return res.status(404).json({
                msg: "❌ Sorry, your vehicle is NOT found in our parking lot!",
            });
        }

        const status = vehicle.isPickedUp ? "picked up" : "parked";
        return res.status(200).json({
            msg: `✅ Your vehicle with plate number ->${numberPlate} is currently ${status}`,
        });
    } catch (error) {
        console.error("Error fetching vehicle:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;