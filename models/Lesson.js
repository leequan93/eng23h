const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
    key: { type: String, required: true, trim: true, unique:true },
    type: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true, trim: true },
    level: { type: Number, required: true },
    status: { type: Boolean, required: true },
    delete: { type: Boolean, required: true },
}, { timestamps: true });

const Lesson = mongoose.model('Lesson', lessonSchema);

module.exports = Lesson;
