const multer  = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/audio')
    },
    filename: function (req, file, cb) {
        let filename = Date.now() + path.extname(file.originalname);
        if (req.params.key) {
            filename = req.params.key + path.extname(file.originalname);
        }
        cb(null, filename)
    }
});

const upload = multer({ 
    storage: storage,
    fileFilter: function (req, file, cb) {
        var ext = path.extname(file.originalname);
        if(ext !== '.mp3') {
            return cb(new Error('Only .mp3 are allowed'));
        }
        cb(null, true)
    }
});

module.exports = upload;