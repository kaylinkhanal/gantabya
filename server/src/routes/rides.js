const express=require('express')
const router=express.Router()
const Ride =require('../controller/rides')

router.post('/rides',Ride.addNewRide)
router.get('/rides',Ride.getAllRides)




module.exports=router;
