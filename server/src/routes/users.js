const express = require('express')

const mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
const saltRounds = 10;
require('dotenv').config()
const bcrypt = require('bcrypt');

app.post('/register', async(req, res) => {
    try {
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
      
    } catch (error) {
      message.error("Unable to get response from register")
      
    }
  
  
  })
     module.exports=router;