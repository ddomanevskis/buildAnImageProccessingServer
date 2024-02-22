const { Router } = require('express');
require('multer');
require('path');

const router = Router();
const storage = diskStorage({destination:'api/uploads', filename:filename});
const upload = multer({fileFilter, storage});
const photoPath = path.resolve(__dirname, '../../client/photo-viewer.html');
const imageProcessor = require('./imageProcessor');

function filename (request, file, callback) {
  callback(null, file.originalname);
}

function fileFilter (request, file, callback) {
  if (file.mimetype !== 'image/img') {
    request.fileValidationError = 'Wrong file type';
    callback(null, false, new Error('Wrong file type'));
    
  } else {
    callback(null, true);
  }
}

router.post('/upload', upload.single('photo'), async (request, response) => {
  if (request.fileValidationError) {
    return response.status(400).json({error: request.fileValidationError});
  } else {
    return response.status(201).json({success: true});
  }
  
  try {
    await imageProcessor(request.file.filename);
  } catch (error) {
    
  }
});

router.get('/photo-viewer', (request, response) => {
  response.sendFile(photoPath);
});

module.exports = router; 
