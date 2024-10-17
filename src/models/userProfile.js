const mongoose = require("mongoose")

const userProfileSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,  // Reference to User model
        ref: 'User',
        required: true
    },
    userName:{
        type:String,
        required:true,
        maxLength:100, 
        unique:true
    
    },
    contact:{
        type:Number,
        required:true,
       
    },
    about:{
        type:String,
        default:"Hi there i am using CodeMate😎",
        maxLength:200
    },
    gender:{
        type:String,
        required:true,
        validate(value){
            if(!["Male", "Female","Others"].includes(value)){
                throw new Error("Enter gender is not allowed")
            }
        }
    },
    photos:{
        type:[String]
    },
    skills:{
        type:[String],
        required:true,
        validate(value){
            if(value.length>15){
                throw new Error('More then 15 skills are not allowed')
            }
        }
    
    },
    experienceLevel:{
        type:String,
        default:"I am new Devloper",
        enum:["Junior","Mid","Senior","New Devloper"]
    },
    github:{
        type:String,
        maxLength:300,
        required:true
    },
    projects:{
        type:[String],
        required:true
    }

})

module.exports = mongoose.model("UserProfile",userProfileSchema)