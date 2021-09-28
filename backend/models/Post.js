import mongoose from "mongoose";
import { commentSchema } from './Comment.js';

const postSchema = new mongoose.Schema({
  author: String,
  content: String,
  image: String,
  totalComments: { type: Number, default: 0 },
  comments: [commentSchema],
});

postSchema.methods.addComment = async function (comment) {
  if (this.comments.length === 3) {
    this.comments.pop();
  }
  this.totalComments++;
  this.comments.push(comment);
  await comment.save();
  return this.save();
};

const Post = mongoose.model("posts", postSchema);

export default Post;
