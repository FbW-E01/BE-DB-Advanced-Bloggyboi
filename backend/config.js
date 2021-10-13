import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import seed from "./seeders/seed.js";
import requestlogger from "./middleware/requestlogger.js";
import connect from "./db.js";

async function config(app) {
  app.use(cors());
  app.use(express.json());
  app.use(requestlogger);

  // Read environment variables
  const dotenvResult = dotenv.config({ path: "backend/.env" });
  if (dotenvResult.error) {
    console.log("ERROR when loading .env", dotenvResult.error);
    process.exit(1);
  }

  // Connect to MongoDB
  await connect();

  // If we are running in the dev environment, seed data
  if (process.env.ENVIRONMENT === "dev") {
    await seed();
  }
}

export default config;
