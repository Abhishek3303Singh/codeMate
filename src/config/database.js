const mongoose = require('mongoose')
require('dotenv').config()
require("dotenv").config({ path: "config/config.env" });

const connectDB = async ()=>{
    // console.log(process.env.MONGO_DB_PORT)
    await mongoose.connect(process.env.MONGO_DB_PORT)
}



// since we are using a async function to connect so we know it returns a Promise so we should handle a Happy case and catch the error if any 
// //// Note we should always connect db with server first then start listening to a port to do this we handle this promise inside app.js where we listening the req on port no 0118
// connectDB().then(()=>{
//     console.log("Successflly connected to Database!!")
// }).catch((err)=>{
//     console.log("Failed to connect Database")

// })
module.exports = connectDB