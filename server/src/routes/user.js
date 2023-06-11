const express=require('express')
const router=express.Router()
const Users = require('../model/users')
const uploadMiddleware = require('../middleware/uploadMiddleware')
const User =require('../controller/user')
router.put('/changePassword/:id',User.PutChangePassword)
router.post('/register', uploadMiddleware, User.registerUser)
router.post('/login',User.loginUser)
router.get('/avatar/:id',User.getAvatar)
router.get('users',User.getUsers)

module.exports=router;
