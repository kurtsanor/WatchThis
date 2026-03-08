const movieService = require("../services/movieService");

const searchByTitleAndPage = async (req, res, next) => {
  try {
    const title = req.query.query;
    const page = req.query.page;
    const result = await movieService.searchByTitleAndPageApi(title, page);
    res.status(200).json({ data: result });
  } catch (error) {
    next(error);
  }
};

const findByGenreAndPage = async (req, res, next) => {
  try {
    const genre = req.query.genre;
    const page = req.query.page;
    const result = await movieService.findByGenreAndPageApi(genre, page);
    res.status(200).json({ data: result });
  } catch (error) {
    next(error);
  }
};

const findTrailerByTypeAndId = async (req, res, next) => {
  try {
    const type = req.params.type;
    const id = req.params.id;
    const result = await movieService.findTrailerByTypeAndIdApi(type, id);
    res.status(200).json({ data: result });
  } catch (error) {
    error.status = 400;
    next(error);
  }
};

const findPlayingNow = async (req, res, next) => {
  try {
    const result = await movieService.findPlayingNowApi();
    res.status(200).json({ data: result });
  } catch (error) {
    error.status = 400;
    next(error);
  }
};

const findOnTheAir = async (req, res, next) => {
  try {
    const result = await movieService.findOnTheAirApi();
    res.status(200).json({ data: result });
  } catch (error) {
    error.status = 400;
    next(error);
  }
};

const findDetailsById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await movieService.findDetailsByIdApi(id);
    res.status(200).json({ data: result });
  } catch (error) {
    error.status = 400;
    next(error);
  }
};

const findCreditsById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await movieService.findCreditsByIdApi(id);
    res.status(200).json({ data: result });
  } catch (error) {
    error.status = 400;
    next(error);
  }
};

const globalSearch = async (req, res, next) => {
  try {
    const query = req.query.query;
    const page = req.query.page;

    const result = await movieService.globalSearchApi(query, page);
    res.status(200).json({ data: result });
  } catch (error) {
    error.status = 400;
    next(error);
  }
};

module.exports = {
  findByGenreAndPage,
  searchByTitleAndPage,
  findTrailerByTypeAndId,
  findPlayingNow,
  findOnTheAir,
  findDetailsById,
  findCreditsById,
  globalSearch,
};
