const express = require("express");

const app = express();

const {adminAuth} = require("../utils/Middlewares");

app.use("/admin", adminAuth);

app.get("/admin/check", (req,res) => {
    res.send("admin checking"); 
})

app.listen(3000 , () => {
    console.log("Server stared");
})

