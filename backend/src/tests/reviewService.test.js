const Review = require("../models/Review");
const reviewService = require("../services/reviewService");

// mock mongoose model
jest.mock("../models/Review");

describe("Review Service Unit Tests", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // ===============================
  // create
  // ===============================
  it("should create a review", async () => {
    const mockReview = { mediaId: 1, userId: "user123" };

    Review.create.mockResolvedValue(mockReview);

    const result = await reviewService.create(mockReview);

    expect(Review.create).toHaveBeenCalledWith(mockReview);
    expect(result).toEqual(mockReview);
  });

  // ===============================
  // findAllByMediaIdApi
  // ===============================
  it("should return reviews with populate and sort", async () => {
    const mockReviews = [{ reviewText: "Nice" }];

    // mock chaining: find → populate → sort
    const sortMock = jest.fn().mockResolvedValue(mockReviews);
    const populateMock = jest.fn().mockReturnValue({ sort: sortMock });

    Review.find.mockReturnValue({
      populate: populateMock,
    });

    const result = await reviewService.findAllByMediaIdApi(1);

    expect(Review.find).toHaveBeenCalledWith({ mediaId: 1 });
    expect(populateMock).toHaveBeenCalledWith("userId");
    expect(sortMock).toHaveBeenCalledWith({ createdAt: -1 });
    expect(result).toEqual(mockReviews);
  });

  // ===============================
  // existsByMediaAndUserApi
  // ===============================
  it("should check if review exists", async () => {
    const mockReview = { _id: "abc" };

    Review.findOne.mockResolvedValue(mockReview);

    const result = await reviewService.existsByMediaAndUserApi(1, "user123");

    expect(Review.findOne).toHaveBeenCalledWith({
      mediaId: 1,
      userId: "user123",
    });

    expect(result).toEqual(mockReview);
  });

  it("should return null if review does not exist", async () => {
    Review.findOne.mockResolvedValue(null);

    const result = await reviewService.existsByMediaAndUserApi(1, "user123");

    expect(result).toBeNull();
  });

  // ===============================
  // updateApi
  // ===============================
  it("should update a review", async () => {
    const mockUpdated = {
      _id: "123",
      rating: 5,
      reviewText: "Updated",
    };

    Review.findOneAndUpdate.mockResolvedValue(mockUpdated);

    const request = {
      _id: "123",
      rating: 5,
      reviewText: "Updated",
    };

    const result = await reviewService.updateApi(request);

    expect(Review.findOneAndUpdate).toHaveBeenCalledWith(
      { _id: "123" },
      {
        rating: 5,
        reviewText: "Updated",
      },
      { new: true, runValidators: true },
    );

    expect(result).toEqual(mockUpdated);
  });

  // ===============================
  // deleteApi
  // ===============================
  it("should delete a review", async () => {
    Review.deleteOne.mockResolvedValue({ deletedCount: 1 });

    const result = await reviewService.deleteApi("123");

    expect(Review.deleteOne).toHaveBeenCalledWith({ _id: "123" });
    expect(result.deletedCount).toBe(1);
  });

  // ===============================
  // findById
  // ===============================
  it("should find review by id", async () => {
    const mockReview = { _id: "123" };

    Review.findById.mockResolvedValue(mockReview);

    const result = await reviewService.findById("123");

    expect(Review.findById).toHaveBeenCalledWith("123");
    expect(result).toEqual(mockReview);
  });

  // ===============================
  // error case
  // ===============================
  it("should throw error if DB fails", async () => {
    Review.create.mockRejectedValue(new Error("DB error"));

    await expect(reviewService.create({ mediaId: 1 })).rejects.toThrow(
      "DB error",
    );
  });
});
