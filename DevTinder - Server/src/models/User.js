const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
    firstName: {
        type : String,
        required : true,
        minLength : 3,
        maxLength  : 50,
        trim:true,
    },
    lastName: {
        type : String,
        required : true,
        minLength : 1,
        maxLength : 50,
        trim:true,
    },
    emailId: {
        type : String,
        required: true,
        unique : true,
        validate(value){
            if(!(validator.isEmail(value))){
                throw new Error("Email is Invalid" + value);
            }
        },
        minLength : 5,
        maxLength : 30,
        trim:true,
    },
    password : {
        type : String,
        validate(value){
            if(!(validator.isStrongPassword(value))){
                throw new Error("Enter a strong password");
            }
        },
        maxLength : 100,
    },
    phone: {
        type : String,
        unique : true,
        required : true,
        minLength:10,
        maxLength :10,
        trim:true,
    },
    gender: {
        type : String,
        lowercase : true,
        enum:{
            values: ["male", "female", "others"],
            message: `{VALUE} is not a gender`,
        },
        trim:true,
    },
    photoURL:{
        type:String,
        default:"https://www.google.com/imgres?q=profile%20pics%20default&imgurl=https%3A%2F%2Fimg.freepik.com%2Fpremium-vector%2Fdefault-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_561158-3485.jpg&imgrefurl=https%3A%2F%2Fwww.freepik.com%2Fpremium-vector%2Fdefault-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-vector-illustration_136983700.htm&docid=due-fP6YSRx-HM&tbnid=9IIp7r61AMBiGM&vet=12ahUKEwjulfTt77yOAxUexjgGHc55NuwQM3oFCIQBEAA..i&w=626&h=626&hcb=2&ved=2ahUKEwjulfTt77yOAxUexjgGHc55NuwQM3oFCIQBEAA",
        trim:true,


    },
    skills:{
        type : [String],
    }
},{
    timestamps : true
});

UserSchema.methods.getJWT = async function(){
    const user = this;
    const token = await jwt.sign({_id : user._id} , "DevTinderSecretKey" , {expiresIn : "7d"});
    return token;
}

UserSchema.methods.isValidPassword = async function(password){
    const user = this;
    const isPasswordValid = await bcrypt.compare(password , user.password);
    return isPasswordValid;
}

module.exports = mongoose.model("User" , UserSchema);