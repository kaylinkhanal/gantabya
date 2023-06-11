const Users = require('../model/users')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const path = require('path')
const fs =require('fs')
const registerUser= async (req, res) => {
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
     
        req.body.avatarName= req?.file?.filename 
        const data = await Users.create(req.body)
        if (data) {
          res.json({
            msg: "Register success",
            success: true,
          })
        }
      }
    }
  }
const loginUser = async (req, res) => {
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
  
  }
  const getAvatar= async (req, res) => {
    try{
      const userData = await Users.findById(req.params.id)
      if(userData){
        const userImage = path.join(__dirname, '../../uploads/avatar', userData.avatarName )
        const defaultImage = path.join(__dirname, '../../uploads/avatar', userData.avatarName )
        if(fs.existsSync(userImage)){
          res.sendFile(userImage)
        }else{
          res.sendFile(defaultImage)
        }
      }
    }catch(err){
      console.log(err.message)
    }
  }
const getUsers= async (req, res) => {
    const userData = await Users.find()
    res.send({
      userList: userData
    })
    
  }
  const PutChangePassword = async (req, res) => {
    try {
      const user = await Users.findOne({ _id: req.params.id })
      if (user) {
        const { password } = user;
        const isMatched = bcrypt.compareSync(req.body.currentPassword, password);
        if (isMatched) {
          const hash = await bcrypt.hashSync(req.body.newPassword, 10);
          user.password = hash;
          const data = await Users.findByIdAndUpdate(user._id, user);
          if (data) {
            res.status(200).json({ msg: "Password has changed" })
          }
          else {
            res.status(500).json({ msg: "something went wrong" })
          }
        } else {
          res.status(500).json({ msg: "Current password does not matched" })
        }
      }
  
    } catch (err) {
      console.log(err);
    }
  };
  module.exports = {
      registerUser,
      loginUser,
      getAvatar,
      getUsers,
      PutChangePassword
    }