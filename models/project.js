const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProjectSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    about: {
      type: String,
      required: true
    },
    gitRepo: {
      type: String,
      default: "No git repo for this project"
    },
    tags: [
      {
        type: Schema.ObjectId,
        ref: 'Tag',
        required: false
      }
    ]
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Project', ProjectSchema)
