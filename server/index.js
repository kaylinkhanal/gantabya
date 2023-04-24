const app = require('express')()
const port = 3001

app.get('/', (req, res) => {
    res.send('Welcome to Gantabya!')
})

app.listen(port, () => {
    console.log(`Welcome to Gantabya ${port}`)
})