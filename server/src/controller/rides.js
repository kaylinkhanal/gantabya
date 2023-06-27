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
    console.log(req.query)
    //only find rides address that starts with
    const totalCount = await Rides.find()
    let data = await Rides.find()
console.log(data)
  
    if(data && totalCount){
    res.json({
      ridesList:data,
      Count: totalCount
    })
  }
   }

  const getRidesById=async (req, res) => {
    const rideList = await Rides.findById(req.params.id).populate('userId')
    if(rideList){
    res.json({
      rideList: rideList
    })
    }
   }
  
   const deleteRidesById=async (req, res) => {
    const rideList = await Rides.findByIdAndDelete(req.body.id)
    if(rideList){
    res.json({
      rideList: rideList
    })
    }
   }

  module.exports = {
    addNewRide,
    getAllRides,
    getRidesById,
    deleteRidesById
    }