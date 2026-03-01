const mongoose = require("mongoose");

let isConnected = false;

async function getConnection() {
  if (isConnected) return;

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      autoIndex: true,
      dbName: "watchthis_db",
      serverSelectionTimeoutMS: 5000,
      bufferCommands: false,
    });

    isConnected = true;
    console.log("Connected to MongoDB!");
  } catch (err) {
    console.error("MongoDB connection failed:", err);
    throw err; // let app.js middleware handle it instead of killing the process
  }
}

module.exports = getConnection;
