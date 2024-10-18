const mongoose = require("mongoose")

const connectionRequestSchema = new mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    receiverId:{
        type:mongoose.mongoose.Schema.Types.ObjectId,
        required:true
    },
    status:{
        type:String,
        enum:{
            values:["interested", "ignored", "rejected",'accepted'],
            message:`{Value} is not a status type`
        }
    }
},
{
    timestamps:true
})

// create model 

const ConnectionRequestModel = mongoose.model("ConnectionRequest", connectionRequestSchema)

module.exports=ConnectionRequestModel