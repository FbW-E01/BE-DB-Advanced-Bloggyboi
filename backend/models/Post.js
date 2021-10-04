import mongoose from "mongoose";
import { commentSchema } from './Comment.js';

const postSchema = new mongoose.Schema({
  author: {
    type: String,
    minLength: 3
  },
  content: {
    type: String,
    trim: true
  },
  published: Boolean,
  image: String,
  postType: {
    type: String,
    enum: ["Normal", "Advertisement", "Special"],
    default: "Normal"
  },
  totalComments: { type: Number, default: 0 },
  comments: [commentSchema],
});

postSchema.methods.addComment = async function (comment) {
  if (this.comments.length === 3) {
    this.comments.pop();
  }
  this.totalComments++;
  this.comments.unshift(comment);
  await comment.save();
  return this.save();
};

const Post = mongoose.model("posts", postSchema);

export default Post;
