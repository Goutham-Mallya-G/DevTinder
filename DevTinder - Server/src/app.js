import dotenv from 'dotenv';
dotenv.config();
const express = require("express");
const connectDB = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");
const userAuth = require("./utils/userAuth");
const cors = require('cors');


const authUserRouter = require("../src/routes/AuthUser");
const profileRouter = require("../src/routes/profile");
const connectionRouter = require("../src/routes/connection");
const userListRouter = require("./routes/userList");

const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://127.0.0.1:5173",
    "http://127.0.0.1:5174",
    "https://devtinderhub.vercel.app"
];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
            return;
        }
        callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
}));
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

const PORT=process.env.PORT || 3000;

connectDB().then(() => {
    console.log("Database Connection succesful");
    app.listen(PORT , () => {
        console.log(`Server stared on port ${PORT}`);
    });
}).catch((err) => {
    console.log("No connection !");
    console.log(err);
});


