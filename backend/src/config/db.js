const { MongoClient, ServerApiVersion } = require("mongodb");
const mongoose = require("mongoose");

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(process.env.MONGODB_URI, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
// });

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
