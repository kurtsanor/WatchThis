const cloudinary = require("../config/cloudinary");

const uploadToCloudinaryApi = async (buffer, oldPublicId) => {
  // delete old image if it exsists
  if (oldPublicId) {
    await cloudinary.uploader.destroy(oldPublicId);
  }

  // upload to cloudinary
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "watchthis/profiles" },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      },
    );
    stream.end(buffer);
  });
};

module.exports = { uploadToCloudinaryApi };
