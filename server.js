import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";

const start = async () => {
  try {
    await app.listen({ port: 5001, host: "0.0.0.0" });
    console.log("🚀 Payment Service running on port 5001");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
