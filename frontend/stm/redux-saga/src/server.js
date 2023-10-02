const express = require('express')
const cors = require('cors')
const app = express()
const http = require('http')
const server = http.Server(app);
const port = 6868


app.use(cors())

app.get('/', (req, res) => {
    res.json({
        title: 'heloworld'
    })
})

server.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
