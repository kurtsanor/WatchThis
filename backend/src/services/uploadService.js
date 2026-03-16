const cloudinary = require("../config/cloudinary");
const s3 = require("../config/s3");
const { PutObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const crypto = require("crypto");

const STORAGE_PROVIDER = process.env.STORAGE_PROVIDER || "s3";
const BUCKET = process.env.AWS_S3_BUCKET;

const uploadToCloudinary = async (buffer, oldPublicId) => {
  if (oldPublicId) {
    await cloudinary.uploader.destroy(oldPublicId);
  }

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "watchthis/profiles" },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    stream.end(buffer);
  });
};

const uploadToS3 = async (buffer, oldPublicId) => {
  if (oldPublicId) {
    await s3.send(
      new DeleteObjectCommand({
        Bucket: BUCKET,
        Key: oldPublicId,
      })
    );
  }

  const key = `watchthis/profiles/${crypto.randomUUID()}.jpg`;

  await s3.send(
    new PutObjectCommand({
      Bucket: BUCKET,
      Key: key,
      Body: buffer,
      ContentType: "image/jpeg",
    })
  );

  return {
    public_id: key,
    secure_url: `https://${BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`,
  };
};

const uploadToCloudinaryApi = async (buffer, oldPublicId) => {
  if (STORAGE_PROVIDER === "cloudinary") {
    return await uploadToCloudinary(buffer, oldPublicId);
  }

  if (STORAGE_PROVIDER === "s3") {
    return await uploadToS3(buffer, oldPublicId);
  }

  throw new Error("Invalid STORAGE_PROVIDER value");
};

module.exports = { uploadToCloudinaryApi };