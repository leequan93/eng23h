const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true, unique:true },
    password: { type: String, required: true, trim: true },
    role: { type: Number, required: true, trim: true },
    status: { type: Boolean, required: true },
}, { timestamps: true });

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
