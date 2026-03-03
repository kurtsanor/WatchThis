const favoriteService = require("../services/favoriteService");

const findFavoritesByUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const result = await favoriteService.findFavoritesByUserApi(userId);
    res.status(200).json({ data: result });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const addFavorite = async (req, res) => {
  try {
    const favoriteRequest = {
      userId: req.user.id,
      mediaId: req.body.mediaId,
      mediaType: req.body.mediaType,
    };
    const result = await favoriteService.addFavoriteApi(favoriteRequest);
    res.status(201).json({ message: "Added to favorites" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const removeFavorite = async (req, res) => {
  try {
    const deleteRequest = {
      userId: req.user.id,
      mediaId: req.params.mediaId,
    };
    const result = await favoriteService.removeFavoriteApi(deleteRequest);
    res.status(200).json({ message: "Removed from favorites" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const findAllByUserWithDetails = async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await favoriteService.findAllByUserWithDetailsApi(userId);
    res.status(200).json({ data: result });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = {
  addFavorite,
  findFavoritesByUser,
  removeFavorite,
  findAllByUserWithDetails,
};
