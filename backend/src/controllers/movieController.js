const movieService = require("../services/movieService");

const searchByTitleAndPage = async (req, res) => {
  try {
    const title = req.query.query;
    const page = req.query.page;
    const result = await movieService.searchByTitleAndPageApi(title, page);
    res.status(200).json({ data: result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const findByGenreAndPage = async (req, res) => {
  try {
    const genre = req.query.genre;
    const page = req.query.page;
    const result = await movieService.findByGenreAndPageApi(genre, page);
    res.status(200).json({ data: result });
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: error.message });
  }
};

const findTrailerByTypeAndId = async (req, res) => {
  try {
    const type = req.params.type;
    const id = req.params.id;
    const result = await movieService.findTrailerByTypeAndIdApi(type, id);
    res.status(200).json({ data: result });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const findPlayingNow = async (req, res) => {
  try {
    const result = await movieService.findPlayingNowApi();
    res.status(200).json({ data: result });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const findOnTheAir = async (req, res) => {
  try {
    const result = await movieService.findOnTheAirApi();
    res.status(200).json({ data: result });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const findDetailsById = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await movieService.findDetailsByIdApi(id);
    res.status(200).json({ data: result });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const findCreditsById = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await movieService.findCreditsByIdApi(id);
    res.status(200).json({ data: result });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const globalSearch = async (req, res) => {
  try {
    const query = req.query.query;
    const page = req.query.page;

    const result = await movieService.globalSearchApi(query, page);
    res.status(200).json({ data: result });
  } catch (error) {
    res.status(400).json({ message: error.message });
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
