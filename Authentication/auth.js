const adminAuth = (req,res,next) =>{
    const token = "xyz"
    const adminToken = token === "xyz"
    if(!adminToken){
        res.status(401).send("You are not authorized");
    } else {
        next();
    }
}

const userAuth = (req,res,next) => {
    const token ="xuuu";
    const userToken = token === "xuuu";
    if(!userToken){
        res.status(401).send("Craete a user account");
    } else {
        next();
    }
}

module.exports = {
    adminAuth,
    userAuth,
}