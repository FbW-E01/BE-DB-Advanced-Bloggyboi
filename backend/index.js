import express from "express";
import Post from "./models/Post.js";
import Comment from "./models/Comment.js";
import config from './config.js';
import errorCheck from "./middleware/errorCheck.js";
import commentRules from "./validation/commentRules.js";

// Setup Express App
const app = express();
await config(app);

// TODO: Move endpoints to separate controllers

// This endpoint is used to list all posts
app.get("/posts", async (req, res) => {
  res.json(await Post.find());
});

// This endpoint is used to create a new comment on a post
// TODO: Validation, sanitation
app.get("/post/:postId/comments", async (req, res) => {
  const postId = req.params.postId;
  const comments = await Comment.find({ postId: postId });

  res.json(comments);
});

// This endpoint is used to get all comments for a post
app.post("/post/:postId/comments", errorCheck(commentRules), async (req, res) => {
  console.log(req.body);
  const post = await Post.findById(req.params.postId);

  if (!post) {
    res.status(404);
    res.json({ error: "Post not found" });
  }

  try {
    const comment = new Comment({
      author: req.body.author,
      content: req.body.content,
      postId: req.params.postId,
    });
    await post.addComment(comment);
    res.json(comment);
  } catch (error) {
    res.status(400);
    res.json({ error });
    return;
  }
});

// TODO: Add endpoint for adding posts

app.use((req, res) => {
  res.status(404); // http status code, 4xx = client error and 5xx = server error
  res.json({ error: "I don't have what you seek" });
});

app.listen(process.env.PORT, () => {
  console.info(`App listening on http://localhost:${process.env.PORT}`);
});
