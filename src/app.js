const express = require("express")
const app = express();
const {adminAuth,userAuth} = require("../Authentication/auth.js")

app.use("/admin",adminAuth);

app.get("/user/login",(req,res,next)=>{
    res.send("You are redirecting to login page")
})

app.get("/user/data",userAuth,(req,res,next)=>{
    res.send("This is the profile data")
})

app.get("/admin/getAllUser",(req,res,next)=>{
    res.send("This is information about all users")
})

app.get("/admin/deleteUser",(req,res,next)=>{
    res.send("You have deleted a user")
})

app.listen(3001);