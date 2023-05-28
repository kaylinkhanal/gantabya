const Rides = require('../model/rides')
const addNewRide = async (req, res) => {
   const data = await Rides.create(req.body)
   if(data){
    res.json({
      msg: "new ride request success"
    })
   }
  }

  const getAllRides = async (req, res) => {
    const data = await Rides.find()
    res.json({
      ridesList:data
    })
   }
  

  module.exports = {
    addNewRide,
    getAllRides
    }