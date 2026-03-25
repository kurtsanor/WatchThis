const tmdbAxios = require("../utils/axiosInstance");
const tvService = require("../services/tvService");

// mock axios instance
jest.mock("../utils/axiosInstance");

describe("TV Service Unit Tests", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // ===============================
  // searchByTitleAndPageApi
  // ===============================
  it("should search TV shows by title and page", async () => {
    tmdbAxios.get.mockResolvedValue({ data: { results: ["tv1"] } });

    const result = await tvService.searchByTitleAndPageApi("friends", 2);

    expect(tmdbAxios.get).toHaveBeenCalledWith("/search/tv", {
      params: { query: "friends", page: 2 },
    });

    expect(result).toEqual({ results: ["tv1"] });
  });

  // ===============================
  // findByGenreAndPageApi
  // ===============================
  it("should fetch TV shows by genre with genre filter", async () => {
    tmdbAxios.get.mockResolvedValue({ data: { results: ["tvA"] } });

    await tvService.findByGenreAndPageApi(10759, 1);

    expect(tmdbAxios.get).toHaveBeenCalledWith("/discover/tv", {
      params: {
        page: 1,
        language: "en-US",
        sort_by: "popularity.desc",
        with_genres: 10759,
      },
    });
  });

  it("should fetch TV shows without genre if genre is 0", async () => {
    tmdbAxios.get.mockResolvedValue({ data: { results: [] } });

    await tvService.findByGenreAndPageApi(0, 1);

    expect(tmdbAxios.get).toHaveBeenCalledWith("/discover/tv", {
      params: {
        page: 1,
        language: "en-US",
        sort_by: "popularity.desc",
      },
    });
  });

  // ===============================
  // findDetailsByIdApi
  // ===============================
  it("should fetch TV show details by id", async () => {
    tmdbAxios.get.mockResolvedValue({ data: { id: 101 } });

    const result = await tvService.findDetailsByIdApi(101);

    expect(tmdbAxios.get).toHaveBeenCalledWith("/tv/101");
    expect(result).toEqual({ id: 101 });
  });

  // ===============================
  // findCreditsByIdApi
  // ===============================
  it("should fetch TV credits by id", async () => {
    tmdbAxios.get.mockResolvedValue({ data: { cast: ["actor1"] } });

    const result = await tvService.findCreditsByIdApi(101);

    expect(tmdbAxios.get).toHaveBeenCalledWith("/tv/101/credits");
    expect(result).toEqual({ cast: ["actor1"] });
  });

  // ===============================
  // error handling
  // ===============================
  it("should throw error if API fails", async () => {
    tmdbAxios.get.mockRejectedValue(new Error("API error"));

    await expect(tvService.searchByTitleAndPageApi("fail", 1)).rejects.toThrow(
      "API error",
    );
  });
});
