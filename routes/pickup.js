const { Router } = require("express");
const router = Router();
const { VehicleParking } = require("../db/schema")



router.post('/', async (req,res) => {
    try {
        const vehicleType = req.body.type;
        const numberPlate = req.body.plate;

        if(!vehicleType || !numberPlate){
            res.status(400).json({
                msg:"The vehicleType and The numberPlate is required!"
            })
        }

        const record = await VehicleParking.findOne({
            numberPlate: numberPlate,
            isPickedUp: false
        });
        
        if (!record) {
            return res.status(404).json({ error: "Vehicle not found or Already pickedUp!!" });
        }


        if (record) {
            const startTime = new Date(record.startTime); // Retrieve startTime from database
            const endTime = new Date(); 
    
            // Calculate the difference in milliseconds
            const Milliseconds = endTime - startTime;
            const TotalMinutes = Math.floor(Milliseconds / (1000 * 60)); // Minutes
            const TotalHours = Math.floor(Milliseconds / (1000 * 60 * 60)); // Hours

            let rent = 0;

            if(record.vehicleType == 'Bike'){
                rent = 20;
            }else{
                rent = 50;
            }
            
            const TotalRent = Math.round(TotalMinutes * (rent/60));

            record.isPickedUp = true;
            await record.save();

            res.status(200).json({
                message: {
                    startTime: `Start Time: ${startTime}`,
                    currentTime: `Current Time: ${endTime}`,
                    TotalHours: `TotalTime: ${TotalHours} Hours and ${TotalMinutes} Minutes`,
                    totalRent: `The Rent to be Paid is: ${TotalRent} rs`
                }
            })
        } else {
            res.status(400).json({
                message: "No record found or startTime is missing"
            })
        }
    } catch(e){
        res.status(500).json({ error: "An error occurred while processing the request." });
    }
})


module.exports = router;
