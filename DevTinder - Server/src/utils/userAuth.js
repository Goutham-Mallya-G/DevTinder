const jwt = require("jsonwebtoken");
const User = require("../models/User");

const userAuth = async(req,res,next) => {
    try{
        const cookies = req.cookies;
        const {token} = cookies;
        if(!token){
            throw new Error("Token is invalid");
        }
        const decodedId = await jwt.verify(token , "DevTinderSecretKey");
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