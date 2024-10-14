const jwt = require("jsonwebtoken")
const User = require("../models/user")
const SECREATKEY = "PRIYAMeriJaanAbhi@Baby@0118";

const isUserAuthenticated = async(req, res, next)=>{
    // Get token from cookie

    try{
        const {token} = req.cookies
        if(!token){
            throw new Error("Please login..")
        }

        // verify the token

        const decodedData = await jwt.verify(token, SECREATKEY)

        const {_id} = decodedData

        const user = User.findById(_id)
        if(!user){
            throw new Error('user not valid')
        }

        // attached the user to req object with user key 

        req.user = user

        // control goes back to req handler
        next()
    }
    catch(err){
        res.status(400).send("Error:"+err.message)
    }
}

module.exports={
    isUserAuthenticated
}