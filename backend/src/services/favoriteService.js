const Favorite = require("../models/Favorite");
const tmdbAxios = require("../utils/axiosInstance");

const findFavoritesByUserApi = async (userId) => {
  return await Favorite.find({ userId: userId });
};

const addFavoriteApi = async (favoriteRequest) => {
  return await Favorite.create(favoriteRequest);
};

const removeFavoriteApi = async (favoriteRequest) => {
  return await Favorite.deleteOne({
    userId: favoriteRequest.userId,
    mediaId: favoriteRequest.mediaId,
  });
};

const findAllByUserWithDetailsApi = async (userId) => {
  const favorites = await findFavoritesByUserApi(userId);
  const detailedFavorites = favorites.map(async (favorite) => {
    const { mediaId, mediaType } = favorite;
    const endpoint = mediaType === "movies" ? "movie" : "tv";
    return tmdbAxios.get(`/${endpoint}/${mediaId}`).then((res) => res.data);
  });
  return await Promise.all(detailedFavorites);
};

module.exports = {
  findFavoritesByUserApi,
  addFavoriteApi,
  removeFavoriteApi,
  findAllByUserWithDetailsApi,
};
