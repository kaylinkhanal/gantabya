const Users = require('../model/users')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const loginController=async (req, res) => {
    const data = await Users.findOne({ phoneNumber: req.body.phoneNumber })
    if (data) {
      res.json({
        msg: "Already exist",
        success: false
      })
    } else {
      const hash = await bcrypt.hash(req.body.password, 0)
      // console.log(hash)
      if (hash) {
        req.body.password = hash
        const data = await Users.create(req.body)
        if (data) {
          res.json({
            msg: "Register success",
            success: true
  
          })
        }
      }
    }
  
  }

  module.exports=loginController