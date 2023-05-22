const mongoose = require('mongoose');
const dbConnect = async () => {
    try {
      const connection = await mongoose.connect(process.env.MONGO_DB);
      if (connection) {
        console.log("connnectd to mongodb".cyan.underline)
      }
    } catch (err) {
      console.log(err.red.bold)
    }
  }

module.exports = dbConnect