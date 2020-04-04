// express for routing to different api endpoints
const express = require("express")
const router = express.Router()

// mongoose for actually saving stuff to the MongoDB database
const mongoose = require('mongoose');
const {ObjectId} = mongoose

// import models
const Project = require('../models/project')
const Tag = require('../models/tag')

// let filePort = 'http://localhost:3000';

function updateTags(projectID, tags){
  let tagPromise = new Promise((resolve, reject) => {
    var tag_ids = []
    for(var i = 0; i < tags.length; i++){
      var tag_name = tags[i]
      Tag.findOne({name: tag_name}).exec((err, tag) => {
          if(!err && tag != null){
            projects = tag.projects ? tag.projects : []
            projects.push(projectID)
            tag.count = tag.count + 1,
            tag.projects = projects
          } else{
            tag = new Tag({
              name: tag_name,
              projects: [projectID]
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
    Project.find().sort({createdAt : -1 }).exec((err, data) => {
      if(err) res.json(err)
      else{
        res.json({data: data})
      }
    })
  })
   .post((req, res) => {
      const {title, about, gitRepo, tags} = req.body

      var project = new Project({
        title : title,
        about: about,
        gitRepo: gitRepo,
        tags: []
      })

      let projectID = project._id

      tag_list = tags.split(", ")

      updateTags(projectID, tag_list)
        .then(
          (tag_ids) => {
            project.tags = tag_ids

            project.save((err) => {
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
