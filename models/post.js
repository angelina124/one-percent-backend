const mongoose = require('mongoose');
const { Schema } = mongoose;

const PostSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    tags: [
      {
        type: Schema.ObjectId,
        ref: 'Tag',
        required: false
      }
    ],
    percentBetter: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Post', PostSchema)
