import { Router } from 'express';

import { authenticate } from '../middleware/authenticate.js';
import {
  getAllPrimaryAvatars,
  uploadAvatar,
} from '../controllers/avatarController.js';
import { upload } from '../middleware/multer.js';

const router = Router();

router.post(
  '/users/:userId/avatar',
  authenticate,
  upload.single('avatar'),
  uploadAvatar,
);

router.get('/users/avatars', authenticate, getAllPrimaryAvatars);

export default router;
