require("dotenv").config();
const app = require("./app");
const getConnection = require("./config/db");

const PORT = 3000;

getConnection().then((client) => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
