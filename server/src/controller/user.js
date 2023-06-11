const Users = require('../model/users')
const bcrypt = require('bcrypt');
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
      PutChangePassword
    }