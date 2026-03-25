const bcrypt = require("bcrypt");
const Credential = require("../models/Credential");
const jwtUtil = require("../utils/jwtUtil");
const userService = require("../services/userService");

const {
  registerUserApi,
  loginApi,
  setPasswordApi,
} = require("../services/authService");

// Mock dependencies
jest.mock("bcrypt");
jest.mock("../models/Credential");
jest.mock("../utils/jwtUtil");
jest.mock("../services/userService");

describe("Auth Service Unit Tests", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // ===============================
  // registerUserApi
  // ===============================
  describe("registerUserApi", () => {
    it("should register a new user", async () => {
      userService.findByEmailApi.mockResolvedValue(null);

      const mockUser = { _id: "user123" };
      userService.createUserApi.mockResolvedValue(mockUser);

      bcrypt.hash.mockResolvedValue("hashedPassword");
      Credential.insertOne.mockResolvedValue({});

      const request = {
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        password: "123456",
      };

      await registerUserApi(request);

      expect(userService.findByEmailApi).toHaveBeenCalledWith(
        "john@example.com",
      );
      expect(userService.createUserApi).toHaveBeenCalled();
      expect(bcrypt.hash).toHaveBeenCalledWith("123456", 10);
      expect(Credential.insertOne).toHaveBeenCalledWith({
        userId: "user123",
        password: "hashedPassword",
      });
    });

    it("should throw error if email already exists", async () => {
      userService.findByEmailApi.mockResolvedValue({ _id: "existing" });

      await expect(
        registerUserApi({
          email: "test@test.com",
        }),
      ).rejects.toThrow("Email is already in use.");
    });
  });

  // ===============================
  // loginApi
  // ===============================
  describe("loginApi", () => {
    it("should login successfully and return token", async () => {
      const mockUser = { _id: "user123", email: "test@test.com" };

      userService.findByEmailApi.mockResolvedValue(mockUser);

      Credential.findOne.mockResolvedValue({
        userId: "user123",
        password: "hashedPassword",
      });

      bcrypt.compare.mockResolvedValue(true);
      jwtUtil.generateToken.mockReturnValue("mockToken");

      const result = await loginApi({
        email: "test@test.com",
        password: "123456",
      });

      expect(bcrypt.compare).toHaveBeenCalledWith("123456", "hashedPassword");
      expect(result).toBe("mockToken");
    });

    it("should throw error if email does not exist", async () => {
      userService.findByEmailApi.mockResolvedValue(null);

      await expect(loginApi({ email: "none@test.com" })).rejects.toThrow(
        "Email does not exist.",
      );
    });

    it("should throw error for google-only account", async () => {
      const mockUser = { _id: "user123", googleId: "google123" };

      userService.findByEmailApi.mockResolvedValue(mockUser);
      Credential.findOne.mockResolvedValue(null);

      await expect(
        loginApi({ email: "test@test.com", password: "123" }),
      ).rejects.toThrow("registered via Google");
    });

    it("should throw error if password is incorrect", async () => {
      const mockUser = { _id: "user123" };

      userService.findByEmailApi.mockResolvedValue(mockUser);

      Credential.findOne.mockResolvedValue({
        userId: "user123",
        password: "hashedPassword",
      });

      bcrypt.compare.mockResolvedValue(false);

      await expect(
        loginApi({
          email: "test@test.com",
          password: "wrong",
        }),
      ).rejects.toThrow("Incorrect login credentials");
    });
  });

  // ===============================
  // setPasswordApi
  // ===============================
  describe("setPasswordApi", () => {
    it("should update password if current password is correct", async () => {
      const mockCredential = {
        userId: "user123",
        password: "oldHashed",
        save: jest.fn(),
      };

      Credential.findOne.mockResolvedValue(mockCredential);

      bcrypt.compare.mockResolvedValue(true);
      bcrypt.hash.mockResolvedValue("newHashed");

      await setPasswordApi("user123", "oldPass", "newPass");

      expect(bcrypt.compare).toHaveBeenCalledWith("oldPass", "oldHashed");
      expect(mockCredential.password).toBe("newHashed");
      expect(mockCredential.save).toHaveBeenCalled();
    });

    it("should throw error if current password is missing", async () => {
      Credential.findOne.mockResolvedValue({
        userId: "user123",
        password: "hashed",
      });

      await expect(setPasswordApi("user123", null, "newPass")).rejects.toThrow(
        "Current password is required",
      );
    });

    it("should throw error if current password is incorrect", async () => {
      Credential.findOne.mockResolvedValue({
        userId: "user123",
        password: "hashed",
      });

      bcrypt.compare.mockResolvedValue(false);

      await expect(
        setPasswordApi("user123", "wrong", "newPass"),
      ).rejects.toThrow("Current password is incorrect");
    });

    it("should create password if none exists (google user)", async () => {
      Credential.findOne.mockResolvedValue(null);

      bcrypt.hash.mockResolvedValue("hashedNew");

      Credential.create.mockResolvedValue({});

      await setPasswordApi("user123", null, "newPass");

      expect(Credential.create).toHaveBeenCalledWith({
        userId: "user123",
        password: "hashedNew",
      });
    });
  });
});
