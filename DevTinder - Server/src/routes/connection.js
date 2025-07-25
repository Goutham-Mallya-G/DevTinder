const express = require("express");
const connectionRouter = express.Router();
const userAuth = require("../utils/userAuth");
const ConnectionRequest = require("../models/ConnectionRequst");
const User = require("../models/User");

connectionRouter.post("/request/sent/:status/:userId" , userAuth , async (req,res) => {
    try{
       const receiverId = req.params.userId;
       const senderId = req.user._id;
       const status = req.params.status;

       const connectionRequest = new ConnectionRequest({
        senderId,
        receiverId,
        status,
       })

       const allowedStatus = ["ignored" , "intrested"];

       if(!allowedStatus.includes(status)){
        throw new Error("This is not a valid request")
       }

       const receiver = await User.findById(receiverId);
       
       if(!receiver){
           throw new Error("This is not a valid username");
        }

        const existingRequest = await ConnectionRequest.findOne({
            $or:[
                {senderId : senderId , receiverId : receiverId},
                {senderId : receiverId , receiverId : senderId}
            ]
        })

        if(existingRequest){
            throw new Error("Connection is already established")
        }
        
       const data = await connectionRequest.save();
       res.send("Connection request sent to "+ receiver.firstName);
       
    }catch(err){
        res.status(401).send("Error : " + err.message);
    }
})

connectionRouter.post("/request/receive/:status/:userId", userAuth , async (req,res) => {
    try{
        const receiver = req.user;
        const senderId = req.params.userId;
        const status = req.params.status;
        
        const allowedStatus = ["accepted", "rejected"];

        const isValidStatus = allowedStatus.includes(status);

        if(!isValidStatus){
            throw new Error("Request is not valid");
        }

        const connectionRequest = await ConnectionRequest.findOne({
            senderId: senderId,
            receiverId: receiver._id,
            status : "intrested"
        })

        const sender = await User.findById(senderId)

        if(!connectionRequest){
            throw new Error("Request is not valid");
        }

        connectionRequest.status = status;

        const data = await connectionRequest.save();
        res.send("You " + status + " connection from " + sender.firstName);

    }catch(err){
        res.status(401).send("Error : " + err.message)
    }
    
})

module.exports = connectionRouter;