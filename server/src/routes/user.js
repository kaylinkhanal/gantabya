const express=require('express')
const router=express.Router()
const loginController=require('../controllers/loginController')
const registerController=require('../controllers/registerController')

router.post('/register',loginController )

router.post('/login', registerController)

module.exports=router;
