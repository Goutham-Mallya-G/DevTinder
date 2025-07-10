const adminAuth = (req,res, next) => {
    console.log("Admin auth is activated");
    const token = "xyz";
    const isAuthorized = token === "xyz";
    if(!isAuthorized){
        res.status(401).send("unauthoried access");
    }else{
        next();
    }
};
module.exports = {
    adminAuth
};