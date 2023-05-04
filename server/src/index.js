const express = require('express')
//
const mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
const cors = require('cors')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const app = express()
const port = 4000
app.use(cors())
require('dotenv').config()

const connectToDb = async()=>{
  try{
    const connection = await mongoose.connect('mongodb://127.0.0.1:27017/gantabyaDb');
    if(connection){
      console.log("connnectd to mongodb")
    }
  }catch(err){
    console.log(err)
  }
}
connectToDb()


const userSchema = new mongoose.Schema({
  fullName: String, 
  password: String,
  phoneNumber: String,
  role: String
});

const Users = mongoose.model('Users', userSchema);

console.log("connected to database")
app.use(express.json())


app.post('/register', async(req, res) => {
const data = await Users.findOne({phoneNumber:req.body.phoneNumber })
console.log(data)
if(data){
  res.json({
    msg: "Already exist",
    success:false
  })
}else{
  const hash = await bcrypt.hash(req.body.password, 0)
  console.log(hash)
  if(hash){
    req.body.password = hash
    const data = await Users.create(req.body)
    if(data) {
      res.json({
        msg: "Register success",
        success:true

      })
    }
  }
}

})
   



app.post('/login', async (req, res) => {
  //user found in db?
  const data = await Users.findOne({phoneNumber: req.body.phoneNumber})
  if(data){
          //user cred match
          const isMatched = await bcrypt.compare(req.body.password, data.password)
        if(isMatched) {
          //generete the token for this matched user and send the token as reponse
          const token = jwt.sign({ phoneNumber: req.body.phoneNumber }, process.env.SECRET_KEY);
          res.json({message: "login succcess", success:true, token: token})
        }else{
          res.json({message: "login failed",success:false})
        }
  }else{
    res.json({message: "user not exist",success:false})
  }
 
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})