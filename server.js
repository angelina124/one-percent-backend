const express = require("express")

// set up bodyParser
const bodyParser = require('body-parser')

// set up the database
const mongoose = require('mongoose')

if (!mongoose.connection.db) {
  console.log("connecting")
  mongoose.connect(
    "mongodb+srv://angelina124:trthipwgi@one-percent-better-vgovl.mongodb.net/test?retryWrites=true&w=majority",
    {
      keepAlive: true,
      reconnectTries: Number.MAX_VALUE,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false
      // autoIndex: false
    }
  )
}

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// app.get('/', (req, res) => {
//   res.json({ hello: true })
// })

app.use('/api/posts/', require('./routing/post-route'))

// creates express server
app.listen(3000, () => {
  console.log('listening on 3000')
})
