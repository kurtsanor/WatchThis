const serverless = require("serverless-http");
const app = require("../app");
const getConnection = require("../config/db");

// Wrap the app in a serverless handler
const handler = async (req, res) => {
  try {
    await getConnection(); // ensure MongoDB is connected before handling any request
    return app(req, res);
  } catch (err) {
    console.error("Error in serverless handler:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = serverless(handler);
