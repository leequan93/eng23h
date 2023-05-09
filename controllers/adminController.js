const Admin = require('../models/Admin');
const bcrypt = require('bcrypt');

module.exports.register = async (req, res, next) => {
    try {
        if (req.body.token !== process.env.TOKEN_CREATE_ADMIN) {
            const err = new Error('Unauthorized');
            err.statusCode = 401;
            return next(err);
        }

        req.body.password = bcrypt.hashSync(req.body.password, 10);
        const data = await Admin.create({ ...req.body, status: false });

        res.status(200).json({
            status: 'success',
            data: data
        });
    } catch (error) {
        next(error);
    }
}

module.exports.login = async (req, res, next) => {
    try {
        const data = await Admin.findOne({ phone: req.body.phone, status: true });
        if (!data) {
            const err = new Error('Phone not found');
            err.statusCode = 400;
            return next(err);
        }

        if (!bcrypt.compareSync(req.body.password, data.password)) {
            const err = new Error('Password not match');
            err.statusCode = 400;
            return next(err);
        } else {
            req.session.admin = {
                name: data.name,
                phone: data.phone,
                role: data.role,
            }

            res.status(200).json({
                status: 'success',
                data: req.session.admin
            });
        }
    } catch (error) {
        next(error);
    }
}

module.exports.logout = (req, res, next) => {
    try {
        req.session.admin = undefined;
        res.status(200).json({
            status: 'success',
            data: req.session.admin
        });
    } catch (error) {
        next(error);
    }
}

module.exports.me = async (req, res, next) => {
    try {
        const data = await Admin.findOne({ phone: req.admin.phone, status: true });

        if (!data) {
            // reset session
            req.session.admin = undefined;

            const err = new Error('Unauthorized');
            err.statusCode = 401;
            return next(err);
        } else {
            res.status(200).json({
                status: 'success',
                data: req.admin
            });
        }
    } catch (error) {
        next(error);
    }
}
