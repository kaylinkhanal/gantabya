const express = require('express')

const cors = require('cors')


const app = express()
const port = 4000
app.use(cors())
require('dotenv').config()
dbConnect()
console.log("connected to database")
app.use(express.json())


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
