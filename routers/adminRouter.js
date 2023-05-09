const express = new require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

const adminApiAuth = require('../middlewares/adminApiAuth');

router.post('/register', adminController.register);
router.post('/login', adminController.login);
router.post('/logout', adminController.logout);
router.get('/me', adminApiAuth.auth, adminController.me);

module.exports = router;
