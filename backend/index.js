import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import seed from "./seeders/seed.js";
import requestlogger from "./middleware/requestlogger.js";
import Database from "./db.js";
import Post from "./models/Post.js";
import Comment from "./models/Comment.js";

// Read environment variables
const dotenvResult = dotenv.config({ path: 'backend/.env' });
if (dotenvResult.error) {
  console.log("ERROR when loading .env",dotenvResult.error);
  process.exit(1);
}

// Setup / Configure Express
const app = express();
app.use(cors()); // allows cros origin requests
app.use(express.json()); // middleware that converts request bodies to JSON, so we can access it with req.body
app.use(requestlogger);

// Connect to MongoDB - it should be OK to just create a single connection and keep using that: https://stackoverflow.com/questions/38693792
const db = new Database();
await db.connect();

// If we are running in the dev environment, seed data
if (process.env.ENVIRONMENT === "dev") {
  await seed();
}

// Setup routes
app.get("/posts", async (req, res) => {
  const posts = await Post.find();
  res.json(posts);
});

app.get("/post/:postId/comments", async (req, res) => {
  const postId = req.params.postId;
  const comments = await Comment.find({ postId: postId });

  res.json(comments);
});

app.post("/post/:postId/comments", async (req, res) => {
  console.log(req.body);

  const post = await Post.findById(req.params.postId);

  try {
    const comment = new Comment({
      author: req.body.author,
      content: req.body.content,
      postId: req.params.postId,
    });
    await post.addComment(comment);
  } catch (error) {
    res.status(400);
    res.json({ error });
    return;
  }

  res.json(comment);
})

// TODO: Add endpoint for adding posts

app.use((req, res) => {
  res.status(404); // http status code, 4xx = client error and 5xx = server error
  res.send("I don't have what you seek");
});

app.listen(process.env.PORT, () => {
  console.info(`App listening on http://localhost:${process.env.PORT}`);
});
