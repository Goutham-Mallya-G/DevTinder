const express = require("express");
const userListRouter = express.Router();
const userAuth = require("../utils/userAuth");
const ConnectionRequest = require("../models/ConnectionRequst");
const { connection } = require("mongoose");
const User = require("../models/User");

userListRouter.get("/userList/request/received" , userAuth, async (req , res) => {
    try{
        const user = req.user;

        const allRequests = await ConnectionRequest.find(
            {
                receiverId : user._id ,
                status : "intrested"
            }
        ).populate("senderId" , ["firstName" , "lastName" , "gender" , "age" , "about", "photoURL"]);

        if(allRequests.length == 0){
            return res.send([]);
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
        }).populate("senderId" , ["firstName" , "lastName" , "gender" , "age" , "about", "photoURL"] ).populate("receiverId" , ["firstName" ,"lastName", "gender" , "age" , "about", "photoURL"]);

        const data = connections.map((connection) => {
            if(connection.senderId.equals(user._id)){
                return connection.receiverId;
            }else{
                return connection.senderId;
            }
        });

        if(data.length == 0){
            return res.send([]);
        }
        res.send(data);
    }catch(err){
        res.status(400).send("Error : " + err.message);
    }
})

userListRouter.get("/userList/feed" , userAuth , async(req,res)=> {
    try{
        const user = req.user;

        const page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit)|| 10;

        limit = limit > 50 ? 50 : limit;
        const skip = (page - 1) * limit

        const connectionRequests = await ConnectionRequest.find({
            $or:[
                {senderId : user._id},
                {receiverId : user._id}
            ]
        })

        const hiddenUsersFromFeed = new Set();

        connectionRequests.forEach((req) => {
            hiddenUsersFromFeed.add(req.receiverId.toString());
            hiddenUsersFromFeed.add(req.senderId.toString());
        })


        const noConnectionToUser = await User.find({
            _id : {$nin: Array.from(hiddenUsersFromFeed)}
        }).select("firstName lastName gender photoURL about age").skip(skip).limit(limit);

        res.send(noConnectionToUser);

    }catch(err){
        res.status(401).send("Error : " + err.message);
    }
})

module.exports = userListRouter; 