import mongoose from "mongoose";

// NOTE: These values SHOULD be coming from .env!
const username = "jimmy";
const password = "passw0rd";
const db = "exampledb";

const connectionString = `mongodb://${username}:${password}@localhost:27017/${db}`;

mongoose.connection.on("error", (e) => console.log(">> Error!", e) || process.exit(0));
mongoose.connection.on("connecting", () => console.log(">> Connecting"));
mongoose.connection.on("connected", () => console.log(">> Connected"));
mongoose.connection.on("disconnecting", () => console.log(">> Disconnecting"));
mongoose.connection.on("disconnected", () => console.log(">> Disconnected"));

export default class Database {
  async connect() {
    return await mongoose.connect(connectionString);
  }
}
