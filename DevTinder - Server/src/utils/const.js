const dotenv = require("dotenv");
dotenv.config();

const mongo = process.env.mongo;
const jwt_secret_key = process.env.jwt_secret_key;
const default_pic = process.env.default_pic;

module.exports = {
    mongo,
    jwt_secret_key,
    default_pic,
};
