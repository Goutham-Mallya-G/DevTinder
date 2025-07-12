const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect(
        "mongodb+srv://gouthammallya:Mallyagoutham%401@cluster0.dcsfs.mongodb.net/devTinder"
    );
};

module.exports = connectDB;