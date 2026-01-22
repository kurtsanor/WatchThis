const favoriteService = require("../services/favoriteService");

const findFavoritesByUser = async (req, res) => {
  try {
    const userId = req.query.userId;
    const result = await favoriteService.findFavoritesByUserApi(userId);
    res.status(200).json({ data: result });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const addFavorite = async (req, res) => {
  try {
    const result = await favoriteService.addFavoriteApi(req.body);
    res.status(201).json({ message: "Added to favorites" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const removeFavorite = async (req, res) => {
  try {
    const { userId, mediaId } = req.query;
    const deleteRequest = {
      userId: userId,
      mediaId: mediaId,
    };
    const result = await favoriteService.removeFavoriteApi(req.query);
    res.status(201).json({ message: "Removed from favorites" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const findAllByUserWithDetails = async (req, res) => {
  try {
    const userId = req.params.id;

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
