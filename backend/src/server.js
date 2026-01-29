require("dotenv").config({ path: "../.env" }); // remove path if deploying
const app = require("./app");
const getConnection = require("./config/db");

const PORT = 3000;

getConnection().then((client) => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
