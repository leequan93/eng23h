module.exports.auth = (req, res, next) => {
    if (req.session.admin === undefined) {
        res.redirect('/admin/login');
    } else {
        req.admin = req.session.admin;
        next();
    }
}