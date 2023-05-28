const mongoose = require('mongoose');
const ridesSchema = new mongoose.Schema({
  pickUpCoords: {
    lat: {type: String},
    lng:  {type: String},
  },
  destinationCoords: {
    lat:  {type: String},
    lng:  {type: String}
  },
  pickUpAddress: String,
  destinationAddress: String,
  userId: String,
  riderId: String,
  price: Number,
  status: {type: String, default: 'pending'}
  },
  { timestamps: true }
  );
  
  const Rides = mongoose.model('Rides', ridesSchema);
  module.exports = Rides