import mongoose from "mongoose";

export const commentSchema = new mongoose.Schema({
  author: String,
  content: String,
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
});

const Comment = mongoose.model("comments", commentSchema);

export default Comment;