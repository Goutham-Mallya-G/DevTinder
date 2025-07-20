const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema({
    senderId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    receiverId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    status : {
        type : String,
        enum : {
            values : ["intrested" , "ignored" , "accepted" , "rejected"],
            message : `{VALUE} is incorrect status type`,
        }
    }
},{
    timestamps : true
});

connectionRequestSchema.index({senderId : 1 , receiverId : 1});

connectionRequestSchema.pre("save" , function(next){
    const connectionRequest = this;
    if(connectionRequest.senderId.equals(connectionRequest.receiverId)){
        throw new Error("You cannot send request to yourself"); 
    }
    next();
})

module.exports = mongoose.model("connectionRequest" , connectionRequestSchema);

