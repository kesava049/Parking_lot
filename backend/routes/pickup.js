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
            const startTime = new Date(record.startTime); 
            const endTime = new Date(); 
            
            const timeDiffMs = endTime - startTime;
            
            const totalMinutes = Math.floor(timeDiffMs / (1000 * 60)) % 60; 
            const totalHours = Math.floor(timeDiffMs / (1000 * 60 * 60)); 

            let rentPerHour = vehicleType.toLowerCase() === "bike" ? 20 : 50;

            const totalRent = Math.round((timeDiffMs / (1000 * 60 * 60)) * rentPerHour);

            record.isPickedUp = true;
            await record.save();

            res.status(200).json({
                message: {
                    startTime: startTime.toLocaleString(),
                    currentTime: endTime.toLocaleString(),
                    totalTime: `${totalHours} Hours and ${totalMinutes} Minutes`, 
                    totalRent: totalRent 
                }
            });
        }
    } catch (e) {
        console.error("Pickup Error:", e);
        res.status(500).json({ error: "An error occurred while processing the request." });
    }
});

module.exports = router;