const mongoose = require('mongoose');

module.exports.connect = async () => {
    try {
        const conn = await mongoose.connect(process.env.DB_URI);
        console.log('DB connection successfully');
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};
