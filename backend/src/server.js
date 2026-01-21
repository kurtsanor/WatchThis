const app = require("./app");
const connectDb = require("./config/db");
const userService = require("./services/userService");
const authService = require("./services/authService");

const PORT = 3000;

connectDb().then((client) => {
  const db = client.db("watchthis_db");
  userService.setDb(db);
  authService.setDb(db);

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
