const mongoose = require('mongoose');
const appConfig=require('../config/app-congig.json')
const connectionString = appConfig.uri;
const connectToDb = async()=>{
    try{
      const connection = await mongoose.connect(connectionString);
      if(connection){
        console.log("connnectd to mongodb")
      }
    }catch(err){
      console.log(err)
    }
  }
 

  module.exports= connectToDb