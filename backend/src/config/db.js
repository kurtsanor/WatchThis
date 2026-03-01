const mongoose = require("mongoose");

async function getConnection() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await mongoose.connect(process.env.MONGODB_URI, {
      autoIndex: true,
      dbName: "watchthis_db",
    });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!",
    );
  } catch (err) {
    console.error("MongoDB connection failed:", err);
    process.exit(1); // stop server if DB fails
  }
}

module.exports = getConnection;
