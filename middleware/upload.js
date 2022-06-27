const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

function fileFilter (req, file, cb) {
  if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpg' && file.mimetype !== 'image/jpeg') {
   req.fileValidationError = 'Unsupported image file. Please upload JPEG or PNG.';
   return cb(null, false, new Error('Unsupported image file. Please upload JPEG or PNG.'));
  }
  cb(null, true);
}

const upload = multer({ 
  // storage: storage, 
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: fileFilter 
});

module.exports = upload;