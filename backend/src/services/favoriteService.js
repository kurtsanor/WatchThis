let db;

function setDb(database) {
  db = database;
}

const findFavoritesByUserApi = async (userId) => {
  const collection = db.collection("favorites");
  const result = await collection.find({ userId: userId });

  return await result.toArray();
};

const addFavoriteApi = async (favoriteRequest) => {
  const collection = db.collection("favorites");
  const result = await collection.insertOne(favoriteRequest);

  return result;
};

const removeFavoriteApi = async (favoriteRequest) => {
  const collection = db.collection("favorites");

  const result = await collection.deleteOne({
    userId: favoriteRequest.userId,
    mediaId: Number(favoriteRequest.mediaId),
  });
  console.log(result);

  return result;
};

module.exports = {
  setDb,
  findFavoritesByUserApi,
  addFavoriteApi,
  removeFavoriteApi,
};
