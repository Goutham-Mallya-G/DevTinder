const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { default_pic } = require("../utils/const");
const {jwt_secret_key} = require("../utils/const");

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
        required:true, 
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
    about :{
        type:String,
        default:"This is the base description of the user",
        minLength : 3,
        maxLength : 60
    },
    photoURL:{
        type:String,
        default: default_pic,
        trim:true,
    },
    age: {
        type: Number,
        min: 18,
        max: 120,
        required: false
    }
},{
    timestamps : true
});

UserSchema.methods.getJWT = async function(){
    const user = this;
    const token = jwt.sign({_id : user._id} , jwt_secret_key , {expiresIn : "7d"});
    return token;
}

UserSchema.methods.isValidPassword = async function(password){
    const user = this;
    const isPasswordValid = await bcrypt.compare(password , user.password);
    return isPasswordValid;
}

module.exports = mongoose.model("User" , UserSchema);