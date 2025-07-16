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
        const isPasswordValid = await bcrypt.compare(password , user.password);
        if(!isPasswordValid){
            throw new Error("Email or Password is incorrect");
        }
        if(isPasswordValid){
            const token  = await jwt.sign({_id : user._id} , "DevTinderSecretKey");
            res.cookie("token" , token);
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

app.get("/feed" ,async  (req , res) => {
    const gender = req.body.gender;
    try{
        const user = await User.find({gender : gender});
        if(user.length === 0){
            res.send("No user");
        }else{
            res.send(user);
        }
    }catch(err){
        res.status(401).send("Something went wrong");
    }
});

app.delete("/delete",async (req , res)=> {
    const {emailId , password}= req.body;
    try{
        const user = await User.findOne({emailId : emailId});
        if(!user){
            throw new Error("Email or Password is incorrect");
        }
        const isPasswordValid = await bcrypt.compare(password , user.password);
        if(!isPasswordValid){
            throw new Error("Email or Password is incorrect");
        }else{
            const deleteUser = await User.findOneAndDelete({emailId : emailId});
            res.send("User deleted successfully");
        }
    }catch(err){
        res.status(401).send("Error : " + err.message);
    }
});

app.patch("/update/:userId" , async(req,res) => {
    const userId = req.params?.userId;
    const data = req.body;
    try{
        const allowed = ["phone" , "gender" , "photoURL", "lastName" , "skills", "password"];
        const isUpdateAllowed = Object.keys(data).every((k) => allowed.includes(k));
        if(!isUpdateAllowed){
            throw new Error("Update not allowed");
        }
        if(data?.skills.length > 10){
            throw new Error("Skills should not be more than 10");
        }
        const user = await User.findByIdAndUpdate( userId, data ,{ runValidators:true});
        res.send("user updated");
    }catch(err){
        res.status(400).send("Update Failed :"+ err.message);
    }
});

connectDB().then(() => {
    console.log("Database Connection succesful");
    app.listen(3000 , () => {
        console.log("Server stared");
    });
}).catch((err) => {
    console.log("No connection !");
});


