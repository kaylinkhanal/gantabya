const express = require('express')
//
const mongoose = require('mongoose');
const cors = require('cors')
const app = express()
const port = 4000
app.use(cors())


const connectToDb = async()=>{
  try{
    const connection = await mongoose.connect('mongodb://127.0.0.1:27017/gantabyaDb');
    if(connection){
      console.log("connnectd to mongodb")
    }
  }catch(err){
    console.log(errr)
  }
}
connectToDb()


const userSchema = new mongoose.Schema({
  fullName: String, 
  password: String,
  mobileNumber: Number
});

const Users = mongoose.model('Users', userSchema);


app.use(express.json())


app.post('/register', async(req, res) => {
   const data=  await Users.create(req.body)
})
 


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})