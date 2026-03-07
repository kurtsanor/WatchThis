const { uploadToCloudinaryApi } = require("../services/uploadService");
const userService = require("../services/userService");

const uploadUserAvatar = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await userService.findByIdApi(userId);

    const uploadResult = await uploadToCloudinaryApi(
      req.file.buffer,
      user.avatarPublicId,
    );

    const avatarUrl = uploadResult.secure_url;
    const avatarPublicId = uploadResult.public_id;

    const updateResult = await userService.updateUserAvatar(
      userId,
      avatarUrl,
      avatarPublicId,
    );

    return res
      .status(200)
      .json({ message: "Avatar has been updated", data: updateResult });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { uploadUserAvatar };
