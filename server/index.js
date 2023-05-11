const express = require('express')
const cors = require('cors')
const app = express()
const userRoute = require('./routes/user')
app.use("/user",userRoute)
const port = 4000
app.use(cors())
require('dotenv').config()
//exported from users route
const dbConnect = require('../server/database/dbconnect') // exported from dbconnect
dbConnect()
console.log("connected to database")
app.use(express.json())
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)

})