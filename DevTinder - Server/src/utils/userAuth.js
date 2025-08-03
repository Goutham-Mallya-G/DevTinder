const jwt = require("jsonwebtoken");
const User = require("../models/User");
const {jwt_secret_key} = require("./const");

const userAuth = async(req,res,next) => {
    try{
        const cookies = req.cookies;
        const {token} = cookies;
        if(!token){
            throw new Error("Token is invalid");
        }
        const decodedId = jwt.verify(token , jwt_secret_key);
        const{_id} = decodedId;
        const user = await User.findById(_id);
        if(!user){
            throw new Error("User not found");
        }
        req.user = user;
        next();
    }catch(err){
        res.status(401).send("Error : " + err.message);
    }
};

module.exports = userAuth;