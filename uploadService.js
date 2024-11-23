const multer = require('multer');
const path = require('path');

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (ext === '.doc' || ext === '.docx') {
    cb(null, true); // Accept the file
  } else {
    cb(new Error('Only .doc and .docx files are allowed!')); // Reject the file
  }
};

const upload = multer({
  dest: 'uploads/',
  fileFilter,
});

module.exports = upload;
