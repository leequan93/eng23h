const Lesson = require('../models/Lesson');
const path = require('path');

// -------------- public -------------- //

module.exports.list = async (req, res, next) => {
    try {
        const limit = 5;
        const skip = req.query.page ? (req.query.page - 1) * limit : 0;

        const conditions = { 
            status: true, 
            delete: false 
        };

        if (req.query.level) {
            conditions.level = parseInt(req.query.level)
        }

        const data = await Lesson.find(conditions)
                                    .limit(limit)
                                    .skip(skip)
                                    .sort({_id: -1})
                                    .select('key title content level createdAt');

        res.status(200).json({
            status: 'success',
            results: data.length,
            data: data
        });
    } catch (error) {
        next(error);
    }
}

module.exports.detail = async (req, res, next) => {
    try {
        const data = await Lesson.findOne({ key: req.params.key, status: true, delete: false })
                                    .select('key title content level createdAt');

        if (!data) {
            const err = new Error('Lesson not found');
            err.statusCode = 404;
            return next(err);
        }

        res.status(200).json({
            status: 'success',
            data: data
        });
    } catch (error) {
        next(error);
    }
}

module.exports.random = async (req, res, next) => {
    try {
        const conditions = { 
            status: true, 
            delete: false 
        };

        if (req.query.level) {
            conditions.level = parseInt(req.query.level)
        }

        const data = await Lesson.aggregate([ 
            { $match : conditions },
            { $sample: { size: 1 } }
        ]);

        if (!data.length) {
            const err = new Error('Lesson not found');
            err.statusCode = 404;
            return next(err);
        }

        res.status(200).json({
            status: 'success',
            data: data.length ? {
                _id: data[0]._id,
                key: data[0].key,
                title: data[0].title,
                content: data[0].content,
                level: data[0].level,
                createdAt: data[0].createdAt,
            } : null
        });
    } catch (error) {
        next(error);
    }
}

// -------------- admin -------------- //

module.exports.find = async (req, res, next) => {
    try {
        const data = await Lesson.find({ delete: false }).sort({_id: -1});

        res.status(200).json({
            status: 'success',
            results: data.length,
            data: data
        });
    } catch (error) {
        next(error);
    }
}

module.exports.findOne = async (req, res, next) => {
    try {
        const data = await Lesson.findOne({ key: req.params.key, delete: false });

        res.status(200).json({
            status: 'success',
            data: data
        });
    } catch (error) {
        next(error);
    }
}

module.exports.create = async (req, res, next) => {
    try {
        const data = await Lesson.create({ ...req.body, key: path.parse(req.file.filename).name, status: false, delete: false });

        res.status(200).json({
            status: 'success',
            data: data
        });
    } catch (error) {
        next(error);
    }
}

module.exports.update = async (req, res, next) => {
    try {
        const data = await Lesson.findOneAndUpdate({ key: req.params.key }, { ...req.body }, { new: true });

        res.status(200).json({
            status: 'success',
            data: data
        });
    } catch (error) {
        next(error);
    }
}

module.exports.activated = async (req, res, next) => {
    try {
        const data = await Lesson.findOneAndUpdate({ key: req.params.key, status: false }, { status: true }, { new: true });

        res.status(200).json({
            status: 'success',
            data: data
        });
    } catch (error) {
        next(error);
    }
}

module.exports.deactivate = async (req, res, next) => {
    try {
        const data = await Lesson.findOneAndUpdate({ key: req.params.key, status: true }, { status: false }, { new: true });

        res.status(200).json({
            status: 'success',
            data: data
        });
    } catch (error) {
        next(error);
    }
}

module.exports.delete = async (req, res, next) => {
    try {
        const data = await Lesson.findOneAndUpdate({ key: req.params.key, delete: false }, { delete: true }, { new: true });

        res.status(200).json({
            status: 'success',
            data: data
        });
    } catch (error) {
        next(error);
    }
}
