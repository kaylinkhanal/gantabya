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
    
    const data = await Rides.find({status: req.query.status}).skip((req.query.page-1 )* 5).limit(5)
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
  

  module.exports = {
    addNewRide,
    getAllRides,
    getRidesById
    }