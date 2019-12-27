const express = require("express")
const app = express()

// import models
const Post = require('./models/post')

// setup mongo
const MongoClient = require('mongodb').MongoClient

var db

MongoClient.connect('mongodb+srv://angelina124:trthipwgi@one-percent-better-vgovl.mongodb.net/test?retryWrites=true&w=majority', (err, client) => {
  if (err) return console.log(err)
  db = client.db('one-percent-better') // whatever your database name is

  // creates express server
  app.listen(3000, () => {
    console.log('listening on 3000')
  })
})

app.post('/posts', (req, res) => {
  var post = new Post({
    title : req.body.title,
    content: req.body.content,
    tags: req.body.tags ? req.body.tags : [],
    percentBetter: req.body.Number
  })

  post.save((err) => {
    if(err)
      return err
  })
})
