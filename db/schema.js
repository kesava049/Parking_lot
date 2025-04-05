const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://kalepallikesavulareddy:ugPHI1XXuRwbCw6A@cluster0.tzpqn.mongodb.net/Bike_Rental_backend');


const VehicleParkingSchema = new mongoose.Schema({
    vehicleType: String,
    numberPlate: Number,
    startTime: Date,
    isPickedUp: Boolean
})


const VehicleParking = mongoose.model('VehicleParking',VehicleParkingSchema);

module.exports = { VehicleParking };
