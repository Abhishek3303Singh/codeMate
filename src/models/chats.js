const mongoose = require("mongoose")


const chatsSchema = new mongoose.Schema(
    {
        senderId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            require:true
        },
         receiverId:{
            type:mongoose.Schema.Types.ObjectId, 
            ref:"User",
            require:true
    },
    text:{
        type:String,
        required:true
    },
    timestamp:{
        type:Date,
        default:Date.now()
    }
},
{
    timeseries:true
}
)

module.exports = mongoose.model("Chat", chatsSchema)