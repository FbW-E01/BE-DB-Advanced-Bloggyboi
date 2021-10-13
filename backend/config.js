import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import seed from "./seeders/seed.js";
import requestlogger from "./middleware/requestlogger.js";
import Database from "./db.js";

async function config(app) {
  app.use(cors()); // allows cross origin requests
  app.use(express.json()); // converts request bodies to JSON, so we can access it with req.body
  app.use(requestlogger);

  // Read environment variables
  const dotenvResult = dotenv.config({ path: "backend/.env" });
  if (dotenvResult.error) {
    console.log("ERROR when loading .env", dotenvResult.error);
    process.exit(1);
  }

  // Connect to MongoDB - it should be OK to just create a single connection and keep using that: https://stackoverflow.com/questions/38693792
  const db = new Database();
  await db.connect();

  // If we are running in the dev environment, seed data
  if (process.env.ENVIRONMENT === "dev") {
    await seed();
  }
}

export default config;
