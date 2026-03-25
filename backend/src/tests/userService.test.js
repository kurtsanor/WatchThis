const userService = require("../services/userService");
const User = require("../models/User");
const Credential = require("../models/Credential");

jest.mock("../models/User");
jest.mock("../models/Credential");

describe("User Service", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockUser = {
    _id: "user123",
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
  };

  // ===============================
  // createUserApi
  // ===============================
  it("should create a new user", async () => {
    User.create.mockResolvedValue(mockUser);

    const result = await userService.createUserApi(mockUser);

    expect(User.create).toHaveBeenCalledWith(mockUser);
    expect(result).toEqual(mockUser);
  });

  // ===============================
  // findByEmailApi
  // ===============================
  it("should find a user by email", async () => {
    User.findOne.mockResolvedValue(mockUser);

    const result = await userService.findByEmailApi("john@example.com");

    expect(User.findOne).toHaveBeenCalledWith({ email: "john@example.com" });
    expect(result).toEqual(mockUser);
  });

  // ===============================
  // findByIdApi
  // ===============================
  it("should find a user by ID and return hasPassword true if Credential exists", async () => {
    // Mock User.findById().lean()
    User.findById.mockReturnValue({
      lean: jest.fn().mockResolvedValue(mockUser),
    });

    // Mock Credential.findOne().select().lean()
    Credential.findOne.mockReturnValue({
      select: jest.fn().mockReturnValue({
        lean: jest.fn().mockResolvedValue({ _id: "cred123" }),
      }),
    });

    const result = await userService.findByIdApi("user123");

    expect(User.findById).toHaveBeenCalledWith("user123");
    expect(Credential.findOne).toHaveBeenCalledWith({ userId: "user123" });
    expect(result).toEqual({ ...mockUser, hasPassword: true });
  });

  it("should return hasPassword false if Credential does not exist", async () => {
    User.findById.mockReturnValue({
      lean: jest.fn().mockResolvedValue(mockUser),
    });

    Credential.findOne.mockReturnValue({
      select: jest.fn().mockReturnValue({
        lean: jest.fn().mockResolvedValue(null),
      }),
    });

    const result = await userService.findByIdApi("user123");

    expect(result).toEqual({ ...mockUser, hasPassword: false });
  });

  it("should return null if user not found", async () => {
    User.findById.mockReturnValue({
      lean: jest.fn().mockResolvedValue(null),
    });

    const result = await userService.findByIdApi("user123");

    expect(result).toBeNull();
  });

  // ===============================
  // updateUserAvatar
  // ===============================
  it("should update user's avatar", async () => {
    const updatedUser = {
      ...mockUser,
      avatar: "url123",
      avatarPublicId: "pub123",
    };
    User.findByIdAndUpdate.mockResolvedValue(updatedUser);

    const result = await userService.updateUserAvatar(
      "user123",
      "url123",
      "pub123",
    );

    expect(User.findByIdAndUpdate).toHaveBeenCalledWith(
      "user123",
      { avatar: "url123", avatarPublicId: "pub123" },
      { new: true },
    );

    expect(result).toEqual(updatedUser);
  });
});
