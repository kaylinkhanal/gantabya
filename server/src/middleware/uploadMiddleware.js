const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/avatar');
  },
  filename: function (req, file, cb) {
    const imageName = req.body.phoneNumber + file.originalname;
    cb(null, imageName);
  },
});

const upload = multer({ storage: storage }).single('avatar');

module.exports = upload;