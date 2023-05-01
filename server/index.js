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
try{
  const data=  await Users.create(req.body)
  if(data){
    res.json({msg: "user has been registered"})
  }

  
}catch(err){
  console.log(err)
}
})
   

app.post('/login', async (req, res) => {
    const data = await Users.findOne({phoneNumber: req.body.phoneNumber, password:req.body.password})
    if(data){
      res.json({message: "login succcess"})
    }else{
      res.json({message: "login failed"})
    }
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})