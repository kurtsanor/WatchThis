// Set environment variables BEFORE importing service
process.env.STORAGE_PROVIDER = "s3";
process.env.AWS_S3_BUCKET = "test-bucket";
process.env.AWS_REGION = "us-east-1";

const s3 = require("../config/s3");
const { PutObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const crypto = require("crypto");

// Import service AFTER env is set
const { uploadToCloudinaryApi } = require("../services/uploadService");

// Mocks
jest.mock("../config/s3");
jest.mock("crypto", () => ({
  randomUUID: jest.fn().mockReturnValue("uuid123"),
}));

describe("Upload Service - AWS S3 Only", () => {
  const buffer = Buffer.from("fake image");

  beforeEach(() => {
    jest.clearAllMocks();
    process.env.STORAGE_PROVIDER = "s3"; // reset provider
  });

  // ===============================
  // Upload with oldPublicId (delete + upload)
  // ===============================
  it("should delete old object and upload new object to S3", async () => {
    s3.send.mockResolvedValue({});

    const result = await uploadToCloudinaryApi(buffer, "old-object.jpg");

    // First call: DeleteObjectCommand
    expect(s3.send).toHaveBeenNthCalledWith(1, expect.any(DeleteObjectCommand));
    expect(s3.send.mock.calls[0][0].input.Key).toBe("old-object.jpg");

    // Second call: PutObjectCommand
    expect(s3.send).toHaveBeenNthCalledWith(2, expect.any(PutObjectCommand));
    expect(s3.send.mock.calls[1][0].input.Key).toBe(
      "watchthis/profiles/uuid123.jpg",
    );
    expect(s3.send.mock.calls[1][0].input.Body).toBe(buffer);
    expect(s3.send.mock.calls[1][0].input.ContentType).toBe("image/jpeg");

    // Return value
    expect(result).toEqual({
      public_id: "watchthis/profiles/uuid123.jpg",
      secure_url:
        "https://test-bucket.s3.us-east-1.amazonaws.com/watchthis/profiles/uuid123.jpg",
    });
  });

  // ===============================
  // Upload without oldPublicId (only upload)
  // ===============================
  it("should upload new object without deleting if oldPublicId not provided", async () => {
    s3.send.mockResolvedValue({});

    const result = await uploadToCloudinaryApi(buffer);

    // Only PutObjectCommand called
    expect(s3.send).toHaveBeenCalledTimes(1);
    expect(s3.send.mock.calls[0][0]).toBeInstanceOf(PutObjectCommand);

    expect(result.public_id).toBe("watchthis/profiles/uuid123.jpg");
  });

  // ===============================
  // S3 error propagation
  // ===============================
  it("should throw if s3.send rejects", async () => {
    s3.send.mockRejectedValue(new Error("S3 error"));

    await expect(uploadToCloudinaryApi(buffer, "old.jpg")).rejects.toThrow(
      "S3 error",
    );
  });
});
