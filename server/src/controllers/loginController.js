var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Users = require('../model/users')
const Login = async (req, res) => {
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
  module.exports=Login