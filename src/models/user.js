const mongoose = require("mongoose");
const validator = require("validator")

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
},
{
    timestamps:true
}

);

// creating The Model for userSchema

module.exports = mongoose.model("User", userSchema);
