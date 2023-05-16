const Users = require('../model/users')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const registerController= async (req, res) => {
    //user found in db?
    const data = await Users.findOne({ phoneNumber: req?.body?.phoneNumber })
    if (data) {
      //user cred match
      const isMatched = await bcrypt.compare(req.body.password, data.password)
      if (isMatched) {
        //generete the token for this matched user and send the token as reponse
        const token = jwt.sign({ phoneNumber: req.body.phoneNumber }, process.env.SECRET_KEY);
        res.json({ message: "login succcess", success: true, token: token, role: data.role })
      } else {
        res.json({ message: "login failed", success: false })
      }
    }
    
    
    else {
      res.json({ message: "user does not exist", success: false })
    }
  
  }

module.exports=registerController