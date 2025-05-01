const mongoose = require('mongoose');

const VehicleParkingSchema = new mongoose.Schema({
  vehicleType: String,
  numberPlate: Number,
  startTime: {
    type: Date,
    default: Date.now,
  },
  isPickedUp: {
    type: Boolean,
    default: false,
  }
});

const VehicleParking = mongoose.model('VehicleParking', VehicleParkingSchema);

module.exports = { VehicleParking };