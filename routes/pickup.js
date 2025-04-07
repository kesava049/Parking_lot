const { Router } = require("express");
const router = Router();
const { VehicleParking } = require("../db/schema");

router.post("/", async (req, res) => {
    try {
        const vehicleType = req.body.type;
        const numberPlate = req.body.plate;

        if (!vehicleType || !numberPlate) {
            return res.status(400).json({
                msg: "The vehicleType and The numberPlate is required!"
            });
        }

        const record = await VehicleParking.findOne({
            numberPlate: numberPlate,
            isPickedUp: false
        });

        if (!record) {
            return res.status(404).json({ error: "Vehicle not found or Already pickedUp!!" });
        }

        if (record) {
            const startTime = new Date(record.startTime); // Get startTime from database
            const endTime = new Date(); // Current time
            
            // ✅ Corrected: Calculate Total Time (in milliseconds)
            const timeDiffMs = endTime - startTime;
            
            // ✅ Convert into Hours & Minutes Properly
            const totalMinutes = Math.floor(timeDiffMs / (1000 * 60)) % 60; // Remaining minutes
            const totalHours = Math.floor(timeDiffMs / (1000 * 60 * 60)); // Total hours

            // ✅ Set Rent Per Hour
            let rentPerHour = vehicleType.toLowerCase() === "bike" ? 20 : 50;

            // ✅ Corrected: Calculate Rent for Exact Time
            const totalRent = Math.round((timeDiffMs / (1000 * 60 * 60)) * rentPerHour);

            // ✅ Mark vehicle as picked up
            record.isPickedUp = true;
            await record.save();

            // ✅ Return the Corrected Response
            res.status(200).json({
                message: {
                    startTime: startTime.toLocaleString(),
                    currentTime: endTime.toLocaleString(),
                    totalTime: `${totalHours} Hours and ${totalMinutes} Minutes`, // ✅ Use correct name
                    totalRent: totalRent // ✅ Send as number, not string
                }
            });
        }
    } catch (e) {
        console.error("Pickup Error:", e);
        res.status(500).json({ error: "An error occurred while processing the request." });
    }
});

module.exports = router;