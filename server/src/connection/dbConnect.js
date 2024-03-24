const mongoose = require('mongoose');
const dbConnect = async () => {
    try {
      const connection = await mongoose.connect('mongodb+srv://Raunak:computer12345@cluster0.nnhhs8f.mongodb.net/gantabyaDb');
      if (connection) {
        console.log("connnectd to mongodb")
      }
    } catch (err) {
      console.log(err)
    }
  }

module.exports = dbConnect