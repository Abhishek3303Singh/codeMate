const mongoose = require("mongoose")

const userProfileSchema = new mongoose.Schema({
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
    photos:[String],
    skills:[String],
    experienceLevel:{
        type:String,
        default:"I am new Devloper",
        enum:["Junior","Mid","Senior","New Devloper"]
    },
    github:{
        type:String,
        maxLength:300
    },
    projects:{
        type:String
    }

})

module.exports = mongoose.model("UserProfile",userProfileSchema)