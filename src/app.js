const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const userAuth = require("./utils/userAuth");

app.use(express.json());
app.use(cookieParser());

app.post("/signup" , async (req,res)=> {
    const {firstName , lastName , emailId , password, phone , gender , photoURL , skills} = req.body;
    const passwordHash = await bcrypt.hash(password ,10);
    const user = new User({
        firstName,
        lastName,
        emailId,
        gender,
        photoURL,
        skills,
        phone,
        password : passwordHash,
    });
    try{
        await user.save();
        res.send("User added");
    } catch(err){
        res.status(400).send("user not added"+ err.message);
    }
});

app.post("/login" , async (req ,res) => {
    const {emailId ,password} = req.body;
    try{
        const user = await User.findOne({emailId : emailId});
        if(!user){
            throw new Error("Email or Password is incorrect");
        }
        const isPasswordValid = user.isValidPassword(password);
        if(!isPasswordValid){
            throw new Error("Email or Password is incorrect");
        }
        if(isPasswordValid){
            const token  = await user.getJWT();
            res.cookie("token" , token,{ expires: new Date(Date.now() + (7 * 24) * 3600000)});
            res.send("reading Cookie");
        }
    }catch(err){
        res.status(400).send("Error : " + err.message);
    }
});

app.get("/profile", userAuth, async (req , res) => {
    try{
        const user = req.user;
        res.send(user);
    }catch(err){
        res.status(401).send("Error : " + err.message);
    }
});

app.post("/sendConnection" , userAuth , async(req , res) => {
    try{
        console.log("sent connection request");
        res.send(req.user.firstName + " sent connection request");
    }catch(err){
        res.status(401).send("Error : "+err.message);
    }
})

connectDB().then(() => {
    console.log("Database Connection succesful");
    app.listen(3000 , () => {
        console.log("Server stared");
    });
}).catch((err) => {
    console.log("No connection !");
});


