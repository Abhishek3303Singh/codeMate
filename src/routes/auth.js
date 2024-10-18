const express = require("express");
const { validateSignupData } = require("../utils/validator");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
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

      res.status(200).cookie("token", token);
      res.status(200).send(user);
    }
  } catch (err) {
    res.status(500).send("Error :" + err.message);
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
      const isPasswordValid = userData.validatePassword(password);
      if (!isPasswordValid) {
        throw new Error("Enter Valid id or password");
      } else {
        // if password and id is valid now we created a token

        // const token = jwt.sign({ _id: userData._id }, SECREATKEY,{
        //     expiresIn:'1d'
        // });
        const token = await userData.getJWT();

        res.status(200).cookie("token", token);
        res.status(200).send("Login successfully");
      }
    }
  } catch (err) {
    res.status(500).send("Error:" + err.message);
  }
});

router.get("/logout", async(req, res)=>{
    try{
        res.status(200).cookie("token", null,{
            expires:new Date(Date.now())
        })
    res.status(200).send("Logged out!")
    }
    catch(err){
        res.status(400).send("Error:" + err.message)
    }
})
module.exports=router