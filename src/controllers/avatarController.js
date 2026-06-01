import createHttpError from 'http-errors';

import { User } from '../models/user.js';
import { Avatar } from '../models/avatar-model.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';

export const uploadAvatar = async (req, res, next) => {
  try {
    const { file } = req;
    const userId = req.params.userId;

    console.log('🚀 ~ uploadAvatar ~ userId:', userId);
    console.log('🚀 ~ uploadAvatar ~ file:', file);
    if (!file) {
      throw createHttpError(400, 'No file');
    }

    if (!userId) {
      throw createHttpError(404, 'No user ID');
    }

    const existingUser = await User.exists({ _id: userId });
    if (!existingUser) {
      throw createHttpError(404, 'User not found');
    }

    const existingAvatar = await Avatar.exists({ userId: userId });
    console.log('🚀 ~ uploadAvatar ~ existingAvatar:', existingAvatar);

    let isPrimary = false;

    if (!existingAvatar) {
      isPrimary = true;
    }

    const result = await saveFileToCloudinary(
      file.buffer,
      userId,
      file.originalname,
    );
    console.log('🚀 ~ uploadAvatar ~ result:', result);
    console.log('🚀 ~ uploadAvatar ~ result.secure_url:', result.secure_url);

    const newAvatar = await Avatar.create(
      {
        userId: userId,
        url: result.secure_url,
        publicId: result.publicId,
        isPrimary: isPrimary,
      },
      // { returnDocument: 'after' },
    );
    res.status(201).json({ url: newAvatar.url });
  } catch (error) {
    next(error);
  }
};

export const getAllPrimaryAvatars = async (req, res, next) => {
  try {
    const primaryAvatars = await Avatar.find({ isPrimary: true });
    res.status(200).json(primaryAvatars);
  } catch (error) {
    next(error);
  }
};
