const express = require('express')
const cors = require('cors')
const app = express()
const port = 4000
app.use(cors())
require('dotenv').config()

const connect=require('./connection/connect')
connect();



console.log("connected to database")
app.use(express.json())

   
const loginRouter=require('./routes/loginRouter')
app.use(loginRouter)

const registerRouter=require('./routes/registerRouter')
app.use(registerRouter)





app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})