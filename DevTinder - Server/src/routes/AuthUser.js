const express = require("express");
const User = require("../models/User");
const authUserRouter = express.Router();
const bcrypt= require("bcrypt");

authUserRouter.post("/signup" , async (req,res)=> {
    console.log(req.body);
    const {firstName,lastName, gender , phone , emailId , password , photoURL , skills} = req.body;
    const hashPassword = await bcrypt.hash(password , 10);
    const user = new User({
        firstName,
        lastName,
        gender,
        phone,
        emailId,
        skills,
        password : hashPassword,
        photoURL
    })
    try{
        await user.save();
        res.send("user added successfully");
    }catch(err){
        res.status(401).send("Error : " + err.message);
    }
})

authUserRouter.post("/login" , async (req,res)=>{
    const{emailId , password} = req.body;
    console.log(password);
    const user = await User.findOne({emailId : emailId});
    try{
        if(!user){
            res.status(401).send("Email or Password is incorrect");
        }
        const isPasswordValid = await user.isValidPassword(password);
        if(!isPasswordValid){
            res.status(401).send("Email or Password is incorrect");
        }
        if(isPasswordValid){
            const token = await user.getJWT();
            res.cookie("token" , token, { expires: new Date(Date.now() + (7 * 24) * 3600000)});
            res.send(user);
        }
    }catch(err){
        res.status(400).send("Error : " + err.message);
    }
})

authUserRouter.post("/logout" , (req,res) => {
    res.cookie("token" , null , {expires: new Date(Date.now())});
    res.send("Logout succesfull");
})

module.exports = authUserRouter;