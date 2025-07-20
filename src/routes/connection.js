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
            throw new Error("Connection is pending")
        }
        
       const data = await connectionRequest.save();
       res.send("Connection request sent to "+ receiver.firstName);
       
    }catch(err){
        res.status(401).send("Error : " + err.message);
    }
})

module.exports = connectionRouter;