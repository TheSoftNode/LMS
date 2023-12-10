import dotenv from "dotenv";
import app from "./app";
import connectDB from "../dataAccess/mongoDB";

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: "../config/config.env" });

// Get the DB connection string
const DB: string =
  process.env.DB_CLOUD?.replace("<password>", process.env.PASSWORD as string) ||
  "";

// Connect to DB
connectDB(DB);

// Create Port
const port = process.env.PORT || 3000;

// Listen to the port
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
  connectDB(DB);
});

// Handle unhandled errors
process.on("unhandledRejection", (err: any) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  console.log(err.name, err.message);

  server.close(() => {
    process.exit(1);
  });
});
