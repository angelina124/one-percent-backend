const mongoose = require('mongoose');
const { Schema } = mongoose;

const TagSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    count: {
      type: Number,
      default: 1
    },
    posts: [
      {
        type: Schema.ObjectId,
        ref: 'Post',
        required: false
      }
    ],
    projects: [
      {
        type: Schema.ObjectId,
        ref: 'Project',
        required: false
      }
    ]
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Tag', TagSchema)
