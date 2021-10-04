import mongoose from "mongoose";

export const commentSchema = new mongoose.Schema({
  author: {
    type: String,
    minLength: 3
  },
  content: {
    type: String,
    trim: true
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
});

const Comment = mongoose.model("comments", commentSchema);

export default Comment;