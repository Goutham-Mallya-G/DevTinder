const express = require("express");

const app = express();


app.use("/test" , (req,res)=>{
    res.send("Welcome to the testing page");
})

app.use("/beta",(req,res) => {
    res.send("Caution : This is a beta version");
})

app.use("/",(req,res)=>{
    res.send("hello from the home");
})

app.listen(3000 , () => {
    console.log("Server stared");
})

