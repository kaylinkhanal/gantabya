var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Users = require('../model/users')
const Register = (upload, async (req, res) => {
  const data = await Users.findOne({ phoneNumber: req.body.phoneNumber })
  if (data) {
    res.json({
      msg: 'User Already Exist',
      success: false
    })
  } else {
    const hash = await bcrypt.hash(req.body.password, 0)
    if (hash) {

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
  module.exports=Register