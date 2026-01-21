let db;

function setDb(database) {
  db = database;
}

const createUserApi = async (user) => {
  const collection = db.collection("users");
  const result = await collection.insertOne(user);
  return result;
};

module.exports = { createUserApi, setDb };
