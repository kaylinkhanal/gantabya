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
    const data = await Rides.find({status: req.query.status}).skip((req.query.page-1 )* 5).limit(5)
    res.json({
      ridesList:data
    })
   }

  const getRidesById=async (req, res) => {
    const data = await Rides.findById(req.params.id)
    res.json({
      ridesList:data
    })
   }
  

  module.exports = {
    addNewRide,
    getAllRides,
    getRidesById
    }