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

// for uploading files
var multer = require('multer')

var storage = multer.diskStorage({
      destination: function (req, file, cb) {
      cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' +file.originalname )
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'text/markdown; charset=UTF-8') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

let upload = multer({
    storage: storage,
     limits: {
        fileSize: 16000000
    },
    fileFilter: fileFilter
})

/* function updateTags(tags, post_id){
  return []
  t_ids = new Promise((resolve, reject) => async function(){
    var tag_ids = await tags.forEach(async function(tag){
      Tag.findOneAndUpdate(
       {name: tag},
       { "$push": { "posts": post_id }},
       //{"$inc": {"count": 1}},
       {upsert: true},
       (err, raw) => {
         if(err){
           console.log(err)
         } else{
           //console.log(raw)
         }
       }
     ).then(t =>{
       t_ids.push(t._id)
       //console.log(tag_ids)
     })
     return t_ids
   })
    console.log(tag_ids)
    resolve(tag_ids)
  })
  console.log("tag_ids " + t_ids)
  return t_ids
}
*/
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

    /*updateTags(tags, post._id).then((tag_ids) => {
      console.log("hi")
      console.log(tag_ids)
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
    })*/
  })

module.exports = router
