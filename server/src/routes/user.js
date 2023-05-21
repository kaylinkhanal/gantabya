const express=require('express')
const router=express.Router()
const Users = require('../model/users')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const upload = require('../../middleware/uploadMiddleware')


router.post('/register', upload, async (req, res) => {
  const data = await Users.findOne({ phoneNumber: req.body.phoneNumber })
  if (data) {
    res.json({
      msg: 'User Already Exist',
      success: false
    })
  } else {
    const hash = await bcrypt.hash(req.body.password, 0)
    if (hash) {
      //req.body ideall looks like this
      //req.body = {
      //   phoneNumber:'98432232',
      //   role:'user'
      //.....
      // }

      //but before doing Users.create(req.body)
      //req.body also need avatarName
      //so we assign new key avatarName to req.body
      req.body.password = hash

      req.body.avatarName= req.file.filename
      const data = await Users.create(req.body)
      if (data) {
        res.json({
          msg: "Register success",
          success: true
        })
      }
    }
  }
})

router.post('/login', async (req, res) => {
  //user found in db?
  const data = await Users.findOne({ phoneNumber: req?.body?.phoneNumber })
  if (data) {
    //user cred match
    const isMatched = await bcrypt.compare(req.body.password, data.password)
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
  console.log(req.params.phoneNumber)
})




module.exports=router;
