const mongoose = require('mongoose');
const dbConnect = async()=>{
    try{
      const connection = await mongoose.connect('mongodb://127.0.0.1:27017/gantabyaDb');
      if(connection){
        console.log("connnectd to mongodb")
      }
    }catch(err){
      console.log(err)
    }
  }
  module.exports=dbConnect