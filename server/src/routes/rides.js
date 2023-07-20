const express=require('express')
const router=express.Router()
const Ride =require('../controller/rides')

// const validateToken =(req,res,next)=> {
// console.log(req.headers)
// if(req.headers.authorization){
//     next()
// }res.json({
//     msg: "unauthorized"
// })
// }
router.post('/rides',Ride.addNewRide)
router.delete('/rides',Ride.deleteRidesById)
router.get('/rides/:id',Ride.getRidesById)
// router.get('/rides',validateToken, Ride.getAllRides)
router.get('/rides', Ride.getAllRides)




module.exports=router;
