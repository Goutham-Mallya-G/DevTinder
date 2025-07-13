const mongoose = require("mongoose");
const {mongo} = require("../utils/const")

const connectDB = async () => {
    await mongoose.connect(mongo);
};

module.exports = connectDB;