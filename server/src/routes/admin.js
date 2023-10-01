const express=require('express')
const router=express.Router()
const Users = require('../model/users')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const upload = require('../middleware/uploadMiddleware')
const path = require('path')
const fs =require('fs')
const User =require('../controller/user')


router.get('/users',async (req, res) => {
    const userData = await Users.find()
    res.send({
      userList: userData
    })
    
  })
  router.get('/avatar/:id', async (req, res) => {
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
  
  
  })
  
  router.delete('/users/:id', UsersController.deleteUser)
  router.delete('/delete-account/:id',UsersController.deleteAccount) 

  module.exports=router;