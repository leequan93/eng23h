const express = require('express');
const router = express.Router();

// Admin pages
const adminAuth = require('../middlewares/adminAuth');

router.get('/admin/login', (req, res, next) => {
    res.render('admin/login', { layout: false });
});

router.get('/admin/', adminAuth.auth, (req, res, next) => {
    res.render('admin/index', { layout: 'admin/layout' });
});

router.get('/admin/lesson',  adminAuth.auth, (req, res, next) => {
    res.render('admin/lesson/index', { layout: 'admin/layout' });
});

router.get('/admin/*', function(req, res){
    res.status(404).render('admin/404', { layout: false });
});

// Public pages
router.get('/', (req, res) => {
    res.render('index');
});

router.get('/lesson/:key', (req, res) => {
    res.render('detail');
});

module.exports = router;
