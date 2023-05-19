const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    fullName: {type: String, required: true},
    password: {type: String, required: true},
    phoneNumber: String,
    role: String,
    licenseNumber: String,
    vehicleNumber: String,
    vehicleType: String,
    avatarName: String
  });
  
  const Users = mongoose.model('Users', userSchema);
  module.exports = Users