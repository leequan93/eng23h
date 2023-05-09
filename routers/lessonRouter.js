const express = require('express');
const router = express.Router();
const lessonController = require('../controllers/lessonController');

const adminApiAuth = require('../middlewares/adminApiAuth');
const upload = require('../middlewares/multer');

// -------------- public -------------- //
router.get('/list', lessonController.list);
router.get('/detail/:key', lessonController.detail);
router.get('/random', lessonController.random);

// -------------- admin -------------- //
router.get('/', adminApiAuth.auth, lessonController.find);
router.get('/:key', adminApiAuth.auth, lessonController.findOne);
router.post('/', adminApiAuth.auth, upload.single('audio'), lessonController.create);
router.put('/:key', adminApiAuth.auth, upload.single('audio'), lessonController.update);
router.put('/activated/:key', adminApiAuth.auth, lessonController.activated);
router.put('/deactivate/:key', adminApiAuth.auth, lessonController.deactivate);
router.put('/delete/:key', adminApiAuth.auth, lessonController.delete);

module.exports = router;