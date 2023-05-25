const express=require('express')
const router=express.Router()
const Users = require('../model/users')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const upload = require('../middleware/uploadMiddleware')
const path = require('path')
const fs =require('fs')
const User =require('../controller/user')
console.log(User)
router.post('/register', upload, User.registerUser)

router.post('/login', async (req, res) => {
  //user found in db?
  const data = await Users.findOne({ phoneNumber: req?.body?.phoneNumber })
  if (data) {
    //user cred match
    const isMatched = await bcrypt.compare(req.body.password, data.password)
    console.log(isMatched)
    if (isMatched) {
      //generete the token for this matched user and send the token as reponse
      const token = jwt.sign({ phoneNumber: req.body.phoneNumber }, process.env.SECRET_KEY);
      res.json({ message: "Login Succcess", success: true, token: token, role: data.role, id:data._id })
    } else {
      res.json({ message: "Login Failed", success: false })
    }
  }
  
  
  else {
    res.json({ message: "user does not exist", success: false })
  }

})

router.get('/avatar/:id', async (req, res) => {
  const userData = await Users.findById(req.params.id)
  const userImage = path.join(__dirname, '../../uploads/avatar', userData.avatarName )
  const defaultImage = path.join(__dirname, '../../uploads/avatar', userData.avatarName )
  if(fs.existsSync(userImage)){
    res.sendFile(userImage)
  }else{
    res.sendFile(defaultImage)
  }

})


module.exports=router;
