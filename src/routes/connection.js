const express = require("express");
const connectionRouter = express.Router();
const userAuth = require("../utils/userAuth");

connectionRouter.post("sentConnection" , userAuth , async (req,res) => {
    try{
        console.log("Sent request");
        res.send(res.user.firstName + " has sent connect request");
    }catch(err){
        res.status(401).send("Error : " + err.message);
    }
})

module.exports = connectionRouter;