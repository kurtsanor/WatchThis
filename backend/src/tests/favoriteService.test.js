const favoriteService = require("../services/favoriteService");
const Favorite = require("../models/Favorite");
const tmdbAxios = require("../utils/axiosInstance");

// Mock dependencies
jest.mock("../models/Favorite");
jest.mock("../utils/axiosInstance");

describe("Favorite Service Unit Tests", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // ===============================
  // findFavoritesByUserApi
  // ===============================
  describe("findFavoritesByUserApi", () => {
    it("should return favorites for a user", async () => {
      const mockFavorites = [{ mediaId: 1 }, { mediaId: 2 }];
      Favorite.find.mockResolvedValue(mockFavorites);

      const result = await favoriteService.findFavoritesByUserApi("user123");

      expect(Favorite.find).toHaveBeenCalledWith({ userId: "user123" });
      expect(result).toEqual(mockFavorites);
    });

    it("should return empty array if no favorites", async () => {
      Favorite.find.mockResolvedValue([]);

      const result = await favoriteService.findFavoritesByUserApi("user123");

      expect(result).toEqual([]);
    });
  });

  // ===============================
  // addFavoriteApi
  // ===============================
  describe("addFavoriteApi", () => {
    it("should create a favorite", async () => {
      const mockRequest = {
        userId: "user123",
        mediaId: 10,
        mediaType: "movies",
      };

      const mockCreated = { ...mockRequest, _id: "abc123" };
      Favorite.create.mockResolvedValue(mockCreated);

      const result = await favoriteService.addFavoriteApi(mockRequest);

      expect(Favorite.create).toHaveBeenCalledWith(mockRequest);
      expect(result).toEqual(mockCreated);
    });
  });

  // ===============================
  // removeFavoriteApi
  // ===============================
  describe("removeFavoriteApi", () => {
    it("should delete a favorite", async () => {
      const mockRequest = {
        userId: "user123",
        mediaId: 10,
      };

      Favorite.deleteOne.mockResolvedValue({ deletedCount: 1 });

      const result = await favoriteService.removeFavoriteApi(mockRequest);

      expect(Favorite.deleteOne).toHaveBeenCalledWith({
        userId: "user123",
        mediaId: 10,
      });
      expect(result).toEqual({ deletedCount: 1 });
    });

    it("should handle no deletion", async () => {
      Favorite.deleteOne.mockResolvedValue({ deletedCount: 0 });

      const result = await favoriteService.removeFavoriteApi({
        userId: "user123",
        mediaId: 999,
      });

      expect(result.deletedCount).toBe(0);
    });
  });

  // ===============================
  // findAllByUserWithDetailsApi
  // ===============================
  describe("findAllByUserWithDetailsApi", () => {
    it("should return detailed favorites from TMDB", async () => {
      const mockFavorites = [
        { mediaId: 1, mediaType: "movies" },
        { mediaId: 2, mediaType: "tv" },
      ];

      Favorite.find.mockResolvedValue(mockFavorites);

      tmdbAxios.get.mockImplementation((url) => {
        if (url === "/movie/1") {
          return Promise.resolve({ data: { id: 1, title: "Movie 1" } });
        }
        if (url === "/tv/2") {
          return Promise.resolve({ data: { id: 2, name: "Show 2" } });
        }
      });

      const result =
        await favoriteService.findAllByUserWithDetailsApi("user123");

      expect(Favorite.find).toHaveBeenCalledWith({ userId: "user123" });
      expect(tmdbAxios.get).toHaveBeenCalledTimes(2);

      expect(result).toEqual([
        { id: 1, title: "Movie 1" },
        { id: 2, name: "Show 2" },
      ]);
    });

    it("should return empty array if no favorites", async () => {
      Favorite.find.mockResolvedValue([]);

      const result =
        await favoriteService.findAllByUserWithDetailsApi("user123");

      expect(result).toEqual([]);
      expect(tmdbAxios.get).not.toHaveBeenCalled();
    });

    it("should handle TMDB API failure", async () => {
      const mockFavorites = [{ mediaId: 1, mediaType: "movies" }];
      Favorite.find.mockResolvedValue(mockFavorites);

      tmdbAxios.get.mockRejectedValue(new Error("TMDB error"));

      await expect(
        favoriteService.findAllByUserWithDetailsApi("user123"),
      ).rejects.toThrow("TMDB error");
    });
  });
});
