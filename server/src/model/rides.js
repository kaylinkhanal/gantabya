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
  userId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Users' }],
  riderId: String,
  price: Number,
  distance: String,
  status: {type: String, default: 'PENDING'}
  },
  { timestamps: true }
  );
  
  const Rides = mongoose.model('Rides', ridesSchema);
  module.exports = Rides