const tvService = require("../services/tvService");

const searchByTitleAndPage = async (req, res, next) => {
  try {
    const title = req.query.query;
    const page = req.query.page;
    const result = await tvService.searchByTitleAndPageApi(title, page);
    res.status(200).json({ data: result });
  } catch (error) {
    error.status = 500;
    next(error);
  }
};

const findByGenreAndPage = async (req, res, next) => {
  try {
    const genre = req.query.genre;
    const page = req.query.page;
    const result = await tvService.findByGenreAndPageApi(genre, page);
    res.status(200).json({ data: result });
  } catch (error) {
    error.status = 500;
    next(error);
  }
};

const findDetailsById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await tvService.findDetailsByIdApi(id);
    res.status(200).json({ data: result });
  } catch (error) {
    error.status = 400;
    next(error);
  }
};

const findCreditsById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await tvService.findCreditsByIdApi(id);
    res.status(200).json({ data: result });
  } catch (error) {
    error.status = 400;
    next(error);
  }
};

module.exports = {
  findByGenreAndPage,
  searchByTitleAndPage,
  findDetailsById,
  findCreditsById,
};
