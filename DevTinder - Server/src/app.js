const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/User");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const userAuth = require("./utils/userAuth");
const cors = require('cors');


const authUserRouter = require("../src/routes/AuthUser");
const profileRouter = require("../src/routes/profile");
const connectionRouter = require("../src/routes/connection");
const userListRouter = require("./routes/userList");

app.use(cors({
    origin : "http://localhost:5173",
    credentials : true, 
}))
app.use(express.json());
app.use(cookieParser());

app.use("/" , authUserRouter);
app.use("/" , profileRouter);
app.use("/" , connectionRouter);
app.use("/" , userListRouter);


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


