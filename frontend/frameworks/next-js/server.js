const next = require('next')
const express = require('express')
const cors = require('cors')
const {MongoClient,ObjectId} = require('mongodb')
const PORT = 6868
const app = next({
  dev: process.env.NODE_ENV !=='production'
})
const nextExpress = require("next-express/server")(app).injectInto(express);

const connectToDB = async () => {
  const URI = 'mongodb://0.0.0.0:27017/'
  const client = new MongoClient(URI)
  try {
    await client.connect()
    console.log('connected')
    return client
  } catch (err) {
    console.log(err)
  }
}

let db;

connectToDB().then(response => {
  db = response.db('test')
  console.log('MongoDB database connected')
})

app.prepare().then(() => {
  const server = nextExpress()
  server.use(express.json())
  server.use(cors())

  server.get('/',(req,res) => {
    res.json({
      testing: 'success'
    })
  })
  server.get('/test',(req,res) => {
    db.collection('comments').find({message: 'hello_world'}).toArray((err,result) => {
      console.log(result)
      res.json({
        testing: 'testing',
        data: result
      })
    })
  })
  server.post('/postq',(req,res) => {
    res.json({
      ok: 'ok',
      data : req.body
    })
  })
  return server.listen(PORT)
})
.then(() => console.log(`> Running on http://localhost:${PORT}`))
.catch((err) => {
  console.error(`Server failed to start: ${err.stack}`);
  process.exit(1);
});

