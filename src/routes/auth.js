const express = require("express");
const { validateSignupData } = require("../utils/validator");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { isUserAuthenticated } = require("../middleware/auth");
const userProfile = require("../models/userProfile");

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    // console.log(req.body, "checking data")
    const { firstName, lastName, contact, email, password } = req.body;
    validateSignupData(req);
    // check the email id is present or not . Id shoulds be unique
    const isEmailExist = await User.findOne({ email: email });
    // console.log(isEmailExist, "checking data");
    if (isEmailExist) {
      throw new Error("Credentail Error");
    } else {
      // Encrypting the Password
      const hashPassword = await bcrypt.hash(password, 10);

      const user = new User({
        firstName,
        lastName,
        contact,
        email,
        password: hashPassword,
      });
      await user.save();
      //   const token = jwt.sign({_id:user._id}, SECREATKEY, {
      //     expiresIn:"1d"
      //   })

      const token = await user.getJWT();

      res.status(200).cookie("token", token,{
        
          httpOnly: true, // Secure and not accessible by JavaScript
          secure: false, // Set to true in production with HTTPS
          sameSite: "lax", // Protect against CSRF
        
      });
      res.status(200).json({
        status:"success",
        data:{
          id:user._id,
          firstNmae:user.firstName,
          lastName:user.lastName,
          email:user.email
        }
      });
    }
  } catch (err) {
    res.status(500).json({
      status:"failed",
      message:err.message
    });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    // check email exist on db
    const userData = await User.findOne({ email });
    if (!userData) {
      throw new Error("Enter Valid id or password");
    } else {
      // Check the password
      // const isPasswordValid = bcrypt.compare(password, userData.password);
      const isPasswordValid = await bcrypt.compare(password,userData.password);
      if (!isPasswordValid) {
        throw new Error("Enter Valid id or password");
      } else {
        // if password and id is valid now we created a token

        // const token = jwt.sign({ _id: userData._id }, SECREATKEY,{
        //     expiresIn:'1d'
        // });
        const token = await userData.getJWT();

        res.status(200).cookie("token", token);
        res.status(200).json({
          status:"success",
          data:{
            id:userData._id,
            firstName:userData.firstName,
            lastName:userData.lastName,
            email:userData.email
          }
        });
      }
    }
  } catch (err) {
    res.status(500).json({
      status:"failed",
      message:err.message
    })
  }
});

router.get("/logout", async(req, res)=>{
    try{
        res.status(200).cookie("token", null,{
            expires:new Date(Date.now())
        })
    res.status(200).json({
      status:"success",
      message:"Logged out!"
    })
    }
    catch(err){
        res.status(400).json({
          status:"failed",
          message:err.message
        })
    }
})

router.get("/get/user", isUserAuthenticated, async(req, res)=>{
  try{
    // const profileData = await userProfile.findOne({userId:req.user._id})
    // if(!profileData){
    //   throw new Error("Profile not found create profile")
    // }
    res.status(200).json({
      status:"success",
      data:{
        id:req.user._id,
        firstName:req.user.firstName,
        lastName:req.user.lastName,
        email:req.user.email
      }
    })

  }catch(err){
    res.status(400).json({
      status:"failed",
      message:err.message
    })
  }
})
module.exports=router