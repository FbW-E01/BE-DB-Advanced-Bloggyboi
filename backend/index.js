import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import seed from "./seeders/seed.js";
import requestlogger from "./middleware/requestlogger.js";
import Database from "./db.js";
import Post from "./models/Post.js";

// Read environment variables
const dotenvResult = dotenv.config({ path: 'backend/.env' });
if (dotenvResult.error) {
  console.log("ERROR when loading .env",dotenvResult.error);
  process.exit(1);
}

// Setup / Configure Express
const app = express();
app.use(cors());
app.use(express.json());
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
  const post = await Post.find();
  res.json(post);
});

app.get("/post/{postId}/comments", (req, res) => {
  // TODO: Somehow all comments for the given post from the database
  res.json([]);
});

// TODO: Add endpoint for adding posts
// TODO: Add endpoint for addingcomments 

app.use((req, res) => {
  res.status(404);
  res.send("I don't have what you seek");
});

app.listen(process.env.PORT, () => {
  console.info(`App listening on http://localhost:${process.env.PORT}`);
});
