const express = require("express");
const profileRouter = express.Router();
const userAuth = require("../utils/userAuth");
const User = require("../models/User");

profileRouter.get("/profile" , userAuth , async (req,res) => {
    try{
        const user = req.user;
        res.send(user);
    }catch(err){
        res.status(401).send("Error : " + err.message);
    }
})

profileRouter.patch("/update" , userAuth , async(req,res) =>{
    try{
        const data = req.body;
        const allowedUpdates = ["gender" , "phone" , "firstName" , "lastName" , "skills"];
        const isUpdateAllowd = Object.keys(data).every((key) => allowedUpdates.includes(key));
        if(!isUpdateAllowd){
            throw new Error("Update is not valid");
        }
        if(data?.skills.length > 10){
            throw new Error("Skills should not be more than 10");
        }
        const user = await User.findByIdAndUpdate(req.user._id , data , {runValidators : true});
        res.send("profile Updated");
    }catch(err){
        res.status(401).send("Error : " + err.message);
    }
})

profileRouter.delete("/delete" , userAuth , async (req,res)=>{
    const id = req.user._id;
    try{
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).send("User not found");
        }
        res.send("User Deleted Succesfully");
    }catch(err){
        res.status(500).send("Error : " + err.message);
    }
});

module.exports = profileRouter;