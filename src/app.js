const express = require("express");
const connectDB = require("./config/database")
const app = express();
const User = require("./models/user")

app.post("/signup" , async (req,res)=> {
    const user = new User({
        firstName:"Goutham",
        lastName:"Mallya",
        emailId:"gouthammallya2@gmail.com",
        phone:9080580791,
        gender:"Male",
    });
    try{
        await user.save();
        res.send("User added");
    } catch(err){
        res.status(400).send("user not added"+ err.message);
    }
})

connectDB().then(() => {
    console.log("Connection succesful");
    app.listen(3000 , () => {
        console.log("Server stared");
    });
}).catch((err) => {
    console.log("No connection !")
});


