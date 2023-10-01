
const Users = require('../models/users')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10
const path = require('path')
const fs = require('fs')    
const deleteUser = async (req, res) => {
    try {
        const data = await Users.findByIdAndDelete(req.body.id)
        if (data) {
            res.json({
                msg: "User deleted successfully",
                success: true
            })
        }

    } catch(error) {
        console.log(error);
    }

}


module.exports = { registerUser, loginUser, changePassword, changeUserDetails,verifyUserDetails,getLicenseImgById ,getAllUsers, deleteUser,deleteAccount}
