const mongoose = require("mongoose");
const validator = require("validator")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const SECREATKEY = "PRIYAMeriJaanAbhi@Baby@0118";

// Schema -> Defining the cluster
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 50,
  },
  lastName: {
    type: String,
    maxLength: 30,
  },
  contact: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate(value){
      if(!validator.isEmail(value)){
        throw new Error ("Invalid Email Addrress"+value)
      }
    }
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
    maxLength: 150,
  },
  profile:{type:mongoose.Schema.Types.ObjectId, ref:"UserProfile"}
},
{
    timestamps:true
}

);

// Mehods to offload creat token from login and signup because this is user things
userSchema.methods.getJWT = async function(){
  const user = this 
  const token = await jwt.sign({_id:user._id},SECREATKEY,{
    expiresIn:"1d"
  } )
  return token
}

// Methods to validate password
userSchema.methods.validatePassword=async function(userInputPassword){
  const user = this
  const hashPassword = user.password
  const isPasswordValid = await bcrypt.compare(userInputPassword, hashPassword)
  return isPasswordValid
}

// creating The Model for userSchema

module.exports = mongoose.model("User", userSchema);
