const { Router } = require("express");
const router = Router();
const { VehicleParking } = require('../db/schema'); 

router.post('/', async (req, res) => {  // ✅ Use '/' instead of '/park'
    console.log("Received POST request:", req.body); // ✅ Debug log

    const { type: vehicleType, plate: numberPlate } = req.body;

    if (!vehicleType || !numberPlate) {
        return res.status(400).json({ msg: "The vehicleType and numberPlate are required!" });
    }

    try {
        let startTime = new Date();
        await VehicleParking.create({ vehicleType, numberPlate, startTime, isPickedUp: false });

        res.status(200).json({
            msg: {
                vehicleType: `Vehicle Type: ${vehicleType}`,
                numberPlate: `Vehicle NumberPlate: ${numberPlate}`,
                Status: "Parked Successfully"
            }
        });
    } catch (error) {
        console.error("Error inserting vehicle:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;