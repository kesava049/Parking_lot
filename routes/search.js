const { Router } = require("express");
const router = Router();
const { VehicleParking } = require("../db/schema")


router.get('/', async(req,res) => {
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


module.exports = router;
