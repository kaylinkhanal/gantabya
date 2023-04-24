const app = require('express')()
const port = 3000

app.get('/', (req, res) => {
    res.send('Welcome to Gantabya!')
})

app.listen(port, () => {
    console.log(`Welcome to Gantabya ${port}`)
})