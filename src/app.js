const express = require("express")
let app = express();

app.use("/test",function(req,res){
    res.send("Hello from test")
})

app.use("/hello",(req,res)=> res.send("vanakam da maapla"))

app.listen("3000")