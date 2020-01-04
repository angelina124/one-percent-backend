const express = require("express")
const router = express.Router()

// import models
const Post = require('../models/post')

router.route('/')
  .get((req, res) => {
    Post.find().sort({updatedAt : -1 }).exec((err, data) => {
      if(err) res.json(err)
      else{
        res.json({data: data})
      }
    })
  })
   .post((req, res) => {
    console.log(req.body)
    var post = new Post({
      title : req.body.title,
      content: req.body.content,
      tags: req.body.tags ? req.body.tags : [],
      percentBetter: req.body.Number,
      books: req.body.books ? req.body.books : []
    })

    post.save((err) => {
      if(err)
        res.json({error: true})
      res.json({success: true})
    })
  })

module.exports = router
