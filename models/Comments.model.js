const { Schema, model } = require("mongoose");
const User = require('./User.model')


const commentSchema = new Schema(
  {
    author: {type: Schema.Types.ObjectId, ref: 'User'},
    content: {
        type: String,
        required: true
  }
      },
  {
    timestamps: true,
  },
);

const Comment = model("comment", commentSchema);

module.exports = Comment; 

