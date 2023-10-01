const express = require('express')
const cors = require('cors')
const dbConnect = require('./connection/dbConnect')
const userRoute = require('./routes/user')
const ridesRoute = require('./routes/rides')
const Rides = require('./model/rides')
const app = express()

const socketio = require("socket.io");

// Create the http server
const server = require('http').createServer(app);
const io = socketio(server, {
  cors: {
    origin: "*"
  }
});
require('dotenv').config()
const port = process.env.PORT || 4000
dbConnect()
app.use(express.json({limit:'50mb'}))

app.use(cors())
app.use('/',userRoute)
app.use('/',ridesRoute)

io.on("connection", (socket) => {
  socket.on("rideRequest", async (rideRequest)=>{
    const ridesList = await Rides.find()
    io.emit('rideRequest', ridesList)
  })


  socket.on('changeRideStatus', async (changeRideStatusID)=>{
   
    const res = await Rides.findByIdAndUpdate(changeRideStatusID,{status:'Occupied'})
    if(res){
      const ridesList = await Rides.find()
      io.emit('rideRequest', ridesList)

      
    }
  })
  
});

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

