const favoriteService = require("../services/favoriteService");

const findFavoritesByUser = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const result = await favoriteService.findFavoritesByUserApi(userId);
    res.status(200).json({ data: result });
  } catch (error) {
    error.status = 400;
    next(error);
  }
};

const addFavorite = async (req, res, next) => {
  try {
    const favoriteRequest = {
      userId: req.user.id,
      mediaId: req.body.mediaId,
      mediaType: req.body.mediaType,
    };
    const result = await favoriteService.addFavoriteApi(favoriteRequest);
    res.status(201).json({ message: "Added to favorites" });
  } catch (error) {
    next(error);
  }
};

const removeFavorite = async (req, res, next) => {
  try {
    const deleteRequest = {
      userId: req.user.id,
      mediaId: req.params.mediaId,
    };
    const result = await favoriteService.removeFavoriteApi(deleteRequest);
    res.status(200).json({ message: "Removed from favorites" });
  } catch (error) {
    error.status = 400;
    next(error);
  }
};

const findAllByUserWithDetails = async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await favoriteService.findAllByUserWithDetailsApi(userId);
    res.status(200).json({ data: result });
  } catch (error) {
    error.status = 400;
    next(error);
  }
};

module.exports = {
  addFavorite,
  findFavoritesByUser,
  removeFavorite,
  findAllByUserWithDetails,
};
