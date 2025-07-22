const express = require("express");
const userListRouter = express.Router();
const userAuth = require("../utils/userAuth");
const ConnectionRequest = require("../models/ConnectionRequst");

userListRouter.get("/userList/request/received" , userAuth, async (req , res) => {
    try{
        const user = req.user;

        const allRequests = await ConnectionRequest.find(
            {
                receiverId : user._id ,
                status : "intrested"
            }
        ).populate("senderId" , ["firstName" , "lastName"]);

        if(allRequests.length == 0){
            res.send("There are no new request")
        }

        const data = allRequests.map((connection) => connection.senderId);

        res.send(data);
    }catch(err){
        res.status(401).send("Error : " + err.message)
    }
})

userListRouter.get("/userList/connection" , userAuth , async (req,res) => {
    try{
        const user = req.user;
        const connections = await ConnectionRequest.find({
            $or:[
                {senderId : user , status : "accepted"},
                {receiverId : user , status : "accepted"}
            ]
        }).populate("senderId" , ["firstName" , "lastName"] ).populate("receiverId" , ["firstName" ,"lastName"]);

        const data = connections.map((connection) => {
            if(connection.senderId.equals(user._id)){
                return connection.receiverId;
            }else{
                return connection.senderId;
            }
        });

        if(data.length == 0){
            res.send("There is no connection");
        }
        res.send(data);
    }catch(err){
        res.status(401).send("Error : " + err.message);
    }
})

module.exports = userListRouter;