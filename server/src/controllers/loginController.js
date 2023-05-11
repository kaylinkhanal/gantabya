var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Users=require('../models/userModel')

const Login=async (req, res) => {
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
   
  } 
  module.exports=Login