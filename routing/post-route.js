// express for routing to different api endpoints
const express = require("express")
const router = express.Router()

// mongoose for actually saving stuff to the MongoDB database
const mongoose = require('mongoose');
const {ObjectId} = mongoose

// import models
const Post = require('../models/post')
const Tag = require('../models/tag')

// let filePort = 'http://localhost:3000';

function updateTags(postID, tags){
  let tagPromise = new Promise((resolve, reject) => {
    var tag_ids = []
    for(var i = 0; i < tags.length; i++){
      var tag_name = tags[i]
      Tag.findOne({name: tag_name}).exec((err, tag) => {
          if(!err && tag != null){
            posts = tag.posts ? tag.posts : []
            posts.push(postID)
            tag.count = tag.count + 1,
            tag.posts = posts
          } else{
            tag = new Tag({
              name: tag_name,
              posts: [postID]
            })
          }
          tag.save((err,tag) => {
            if(err){
              console.log(err)
              reject(err)
            } else{
              tag_ids.push(tag._id)
            }
            if(tag_ids.length == tags.length){
              resolve(tag_ids)
            }
          })
        })
    }
  })
  return tagPromise
}

router.route('/')
  .get((req, res) => {
    Post.find().sort({createdAt : -1 }).exec((err, data) => {
      if(err) res.json(err)
      else{
        res.json({data: data})
      }
    })
  })
   .post((req, res) => {
    const {title, tags, content, percentBetter, books} = req.body

    var post = new Post({
      title : title,
      content: content,
      percentBetter: percentBetter,
      books: books ? books : [],
      tags: []
    })

    let postID = post._id

    tag_list = tags.split(", ")

    updateTags(postID, tag_list)
      .then(
        (tag_ids) => {
          post.tags = tag_ids
          
          post.save((err) => {
            if(err){
              console.log(err)
              res.json({error: true})
            }
            else {
              res.json({success: true})
            }
          })
        })
    .catch((error) => {
      console.log(error)
      res.json({error: true})
    })
    })

module.exports = router
