const express = require('express')
const axios = require('axios')
const cors = require('cors')
const redis = require('redis')


const redisClient = redis.createClient()

const app = express()

app.use(express.json())
app.use(cors())

const DEFAULT_EXPIRATION = 3600

app.get('/photos', async (req, res) => {

    const cache = await redisClient.get('photos')

    console.log(cache)
    if (cache) {
        return res.json(cache)
    }

    const result = await axios.get(
        'https://dummyjson.com/products',
        {params: { albumId: req.query.albumId } }
    )

    redisClient.set('photos', JSON.stringify(result.data))

    res.json(result.data)
})

const bootstrap = async () => {
    await redisClient.connect()
    app.listen(3000)
}

bootstrap()