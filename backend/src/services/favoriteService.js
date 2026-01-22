const tmdbAxios = require("../utils/axiosInstance");

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

  return result;
};

const findAllByUserWithDetailsApi = async (userId) => {
  const favorites = await findFavoritesByUserApi(userId);

  const detailedFavorites = favorites.map(async (favorite) => {
    const { mediaId, mediaType } = favorite;

    const endpoint = mediaType === "movies" ? "movie" : "tv";
    return tmdbAxios.get(`/${endpoint}/${mediaId}`).then((res) => res.data);
  });
  const result = await Promise.all(detailedFavorites);
  return result;
};

module.exports = {
  setDb,
  findFavoritesByUserApi,
  addFavoriteApi,
  removeFavoriteApi,
  findAllByUserWithDetailsApi,
};
