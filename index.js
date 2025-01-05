const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { VehicleParking } = require('./db/schema');
const PORT = 3000;
app.use(express.json());


app.post('/park', async(req, res) => {
    const vehicleType = req.body.type;
    const numberPlate = req.body.plate;

    if(!vehicleType || !numberPlate){
        res.status(400).json({
            msg:"The vehicleType and The numberPlate is required!"
        })
    }

    let startTime = new Date();

    await VehicleParking.create({
        vehicleType: vehicleType,
        numberPlate: numberPlate,
        startTime: startTime,
        isPickedUp: false
    })

    res.status(200).json({
        msg:{
            vehicleType: `Vehicle Type: ${vehicleType}`,
            numberPlate: `Vehicle NumberPlate: ${numberPlate}`,
            Status: `Parked Successfully`
        } 
    })

})

app.post('/pickup', async (req,res) => {
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
                    totalRent: `The Rent to be Paid is: ${TotalRent} rs.`
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

app.get('/search', async(req,res) => {
    const vehicleType = req.body.type;
    const numberPlate = req.body.plate;
    const vehicle = await VehicleParking.findOne({numberPlate})

    if(!vehicle){
        res.status(401).json({
            msg: "Sorry Your Vehicle is Not Found in My Parking lot!"
        })
    }
    const status = vehicle.isPickedUp ? "pickUped" : "parked";
    res.status(200).json({
        msg: `Your Vechicle with the plateNumber: ${numberPlate} is ${status} right Now.`
    })
})




app.listen(PORT,()=>{
    console.log(`app running in the port: ${PORT}`);
});