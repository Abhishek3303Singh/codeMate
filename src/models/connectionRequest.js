const mongoose = require("mongoose")

const connectionRequestSchema = new mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    receiverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    status:{
        type:String,
        enum:{
            values:["interested", "ignored", "rejected",'accepted'],
            message:`{Value} is not a status type`
        }
    },
    senderProfileId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"UserProfile",
        required:true
    },
    receiverProfileId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"UserProfile",
        required:true
    }
},
{
    timestamps:true
})

// create model 

const ConnectionRequestModel = mongoose.model("ConnectionRequest", connectionRequestSchema)

module.exports=ConnectionRequestModel