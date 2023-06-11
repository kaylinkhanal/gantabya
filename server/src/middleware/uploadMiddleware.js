const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/avatar');
  },
  filename: function (req, file, cb) {
    const imageName = req.body.phoneNumber + file.originalname;
    cb(null, imageName);
  },
});

const fileFilter = function (req, file, cb) {
  const allowedTypes = ['image/jpg', 'image/jpeg', 'image/png', 'image/bmp', 'image/webp', 'image/svg+xml', 'image/gif'];
 console.log(file)
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    console.log("test")
    cb({ error: 'fileTypeError', fileTypeError: 'Only JPG, JPEG, PNG, BMP, WEBP, SVG, and GIF files are allowed.' });
  }
};



const upload = multer({
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB limit
  fileFilter: fileFilter,
}).single('avatar');

// Middleware to handle file upload
const uploadMiddleware = function (req, res, next) {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // Multer error occurred
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ fileSizeError: 'File size exceeds the allowed limit of 2MB.' });
      }
    } else if (err) {
      // Other error occurred (e.g., file type is invalid)
      return res.status(400).json({ error: err.message });
    }
    next();
  });
};

module.exports = uploadMiddleware;
