const tvService = require("../services/tvService");

const searchByTitleAndPage = async (req, res) => {
  try {
    const title = req.query.query;
    const page = req.query.page;
    const result = await tvService.searchByTitleAndPageApi(title, page);
    res.status(200).json({ data: result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const findByGenreAndPage = async (req, res) => {
  try {
    const genre = req.query.genre;
    const page = req.query.page;
    const result = await tvService.findByGenreAndPageApi(genre, page);
    res.status(200).json({ data: result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const findDetailsById = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await tvService.findDetailsByIdApi(id);
    res.status(200).json({ data: result });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const findCreditsById = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await tvService.findCreditsByIdApi(id);
    res.status(200).json({ data: result });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  findByGenreAndPage,
  searchByTitleAndPage,
  findDetailsById,
  findCreditsById,
};
