const validator = require('validator');

const validateSignupData =(req)=>{
    const {firstName, lastName, emial, password} = req.body
    if(!firstName || !lastName){
        throw new Error('Name should be required!')
    }
    // check for strong password
    if(!validator.isStrongPassword(password)){
        throw new Error("Entered password is not strong")
    }
}

module.exports ={validateSignupData}