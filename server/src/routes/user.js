const express=require('express')
const router=express.Router()
const Users = require('../model/users')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const loginController=require('../controllers/loginController')
const registerController=require('../controllers/registerController')

router.post('/register',loginController )

router.post('/login', registerController)

module.exports=router;
