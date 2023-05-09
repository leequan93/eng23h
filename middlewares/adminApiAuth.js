module.exports.auth = (req, res, next) => {
    if (req.session.admin === undefined) {
        const err = new Error('Unauthorized');
        err.statusCode = 401;
        return next(err);
    } else {
        req.admin = req.session.admin;
        next();
    }
}