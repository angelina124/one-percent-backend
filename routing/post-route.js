// express for routing to different api endpoints
const express = require("express")
const router = express.Router()

// mongoose for actually saving stuff to the MongoDB database
const mongoose = require('mongoose');
const {ObjectId} = mongoose

// import models
const Post = require('../models/post')
const Tag = require('../models/tag')

let filePort = 'http://localhost:3000';


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
      books: books ? books : []
    })

    post.save((err) => {
      if(err){
        console.log(err)
        res.json({error: true})
      }
      else {
        let postID = post._id

        tag_list = tags.split(", ")

        tag_list.forEach((tag_name => {

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
              tag.save((err) => {
                if(err){
                  console.log(err)
                  res.json({error: true})
                } else {
                  let tags = post.tags
                  tags.push(tag)
                  post.save((err) => {
                    if(err){
                      console.log(err)
                      res.json({error: true})
                    } else{
                      console.log(post)
                    }
                  })
                }
              })
            })
        }))

        res.json({success: true})
      }
    })
  })

module.exports = router
