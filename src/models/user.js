const mongoose = require("mongoose");

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
    min: 10,
    max: 10,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
    maxLength: 50,
  },
},
{
    timestamps:true
}

);

// creating The Model for userSchema

module.exports = mongoose.model("User", userSchema);
