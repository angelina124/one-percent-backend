const express = require("express")

// set up bodyParser
const bodyParser = require('body-parser')

// set up the database
const mongoose = require('mongoose')

const constants = require('./constants.js')
// set up cors to allow cross-origin requests
const cors = require('cors')

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
    }
  )
}

const app = express()

// to allow parsing of request bodies
// set up bodyParser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// to allow requests from localhost:3001
app.use(cors({origin:["http://www.booksandbash.com"]}))

app.use('/api/posts/', require('./routing/post-route'))
app.use('/api/projects/', require('./routing/project-route'))

// creates express server
app.listen(5000, () => {
  console.log('listening on 5000')
})
