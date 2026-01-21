const { MongoRuntimeError } = require("mongodb");
const userService = require("./userService");
const bcrypt = require("bcrypt");

let db;

function setDb(database) {
  db = database;
}

const registerUserApi = async (registerRequest) => {
  const user = {
    firstName: registerRequest.firstName,
    lastName: registerRequest.lastName,
    email: registerRequest.email,
  };
  const createdUser = await userService.createUserApi(user);

  const collection = db.collection("credentials");
  const hashedPassword = await bcrypt.hash(registerRequest.password, 10);
  const credentials = {
    userId: createdUser.insertedId,
    password: hashedPassword,
  };
  const result = await collection.insertOne(credentials);
};

const loginApi = async (loginRequest) => {
  const userCollection = db.collection("users");
  const findResult = await userCollection.findOne({
    email: loginRequest.email,
  });

  if (!findResult) {
    throw new Error("Email does not exist");
  }

  const credentialsCollection = db.collection("credentials");
  const result = await credentialsCollection.findOne({
    userId: findResult._id,
  });

  return (await bcrypt.compare(loginRequest.password, result.password))
    ? findResult
    : null;
};

module.exports = { setDb, registerUserApi, loginApi };
