import mongoose from "mongoose";

export default async function connect() {
  const { DB_USER, DB_PASS, DB_HOST, DB_PORT, DB_NAME } = process.env;
  const connectionString = `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;

  mongoose.connection.on("error",         e => console.log(">> Error!", e) || process.exit(0));
  mongoose.connection.on("connecting",    () => console.log(">> Connecting"));
  mongoose.connection.on("connected",     () => console.log(">> Connected"));
  mongoose.connection.on("disconnecting", () => console.log(">> Disconnecting"));
  mongoose.connection.on("disconnected",  () => console.log(">> Disconnected"));

  return await mongoose.connect(connectionString);
}
