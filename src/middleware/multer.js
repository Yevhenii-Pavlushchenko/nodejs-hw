import multer from 'multer';

export const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    const allowedType = 'image/';
    if (file.mimetype.startsWith(allowedType)) {
      cb(null, true);
    } else {
      cb(new Error('Only images allowed.'), false);
    }
  },
});
