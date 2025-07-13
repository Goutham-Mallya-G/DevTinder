const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.use(express.json());

app.post("/signup" , async (req,res)=> {
    const user = new User(req.body);
    try{
        await user.save();
        res.send("User added");
    } catch(err){
        res.status(400).send("user not added"+ err.message);
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
    const id = req.body.id;
    try{
        const user =await  User.findByIdAndDelete(id);
        res.send("User deleted susscefully")
    }catch(err){
        res.status(401).send("Something went wrong");
    }
});

app.patch("/update" , async(req,res) => {
    const mail = req.body.emailId;
    const data = req.body;
    try{
        const user = await User.findOneAndUpdate({emailId : mail}, data);
        res.send("user updated");
    }catch(err){
        res.status(400).send("Something went wrong");
    }
});

connectDB().then(() => {
    console.log("Connection succesful");
    app.listen(3000 , () => {
        console.log("Server stared");
    });
}).catch((err) => {
    console.log("No connection !");
});


