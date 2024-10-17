const express = require("express");
const connectDB = require("../src/cofig/database");
const User = require("./models/user");
const UserProfile = require("./models/userProfile");
const app = express();
var bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const {isUserAuthenticated} = require('./middleware/auth')
const SECREATKEY = "PRIYAMeriJaanAbhi@Baby@0118";

app.use(bodyParser.json());

app.use(cookieParser());
const { validateSignupData } = require("./utils/validator");
// app.get("/ab+c", (req, res)=>{
//     res.send("Wlecome to CodeMate❤❤")
// })

// app.get("/ab?c", (req, res)=>{
//     res.send("Wlecome to CodeMate❤❤")
// })

// app.get("/ab*cd", (req, res)=>{
//     res.send("Wlecome to CodeMate❤❤")
// })

// app.get("/.*ya$/", (req, res)=>{
//     res.send("Wlecome to CodeMate❤❤")
// })

// Query
// app.get("/user", (req, res)=>{
//     let userData = req.query
//     console.log(userData)
//     res.send({
//         userId:userData.userId,
//         name:userData.name
//     })
// })

// Prams

// app.get("/user/:userId/:name", (req, res)=>{
//     let paramsData = req.params
//     res.send({
//         status:"successful",
//         userId:paramsData.userId,
//         Name:paramsData.name
//     })9
// })

/// MUltiple Route Handlers

// app.use("/user", (req, res)=>{
//     console.log("Response!!")
// })

// Above handler hanging the api because it expect response

// multiple Handlers

// app.use("/path", [rH1, rH2, rH3])

// app.use(
//   "/user",
//   (req, res, next) => {
//     console.log("Response!!");
//     next();
//   },
//   (req, res) => {
//     console.log("Response2!!");
//     res.send("2nd Response");
//   }
// );

// Above code has rend the 2nd response next fuction allow this to execute next handler

// Note -- We Should always send the response to avoid handing //


app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    // check email exist on db
    const userData = await User.findOne({ email });
    if (!userData) {
      throw new Error("Enter Valid id or password");
    } else {
      // Check the password
      // const isPasswordValid = bcrypt.compare(password, userData.password);
      const isPasswordValid = userData.validatePassword(password)
      if (!isPasswordValid) {
        throw new Error("Enter Valid id or password");
      } else {
        // if password and id is valid now we created a token

        // const token = jwt.sign({ _id: userData._id }, SECREATKEY,{
        //     expiresIn:'1d'
        // });
        const token = await userData.getJWT()

        res.status(200).cookie("token", token);
        res.status(200).send("Login successfully");
      }
    }
  } catch (err) {
    res.status(500).send("Error:" + err.message);
  }
});

// signup user
app.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, contact, email, password } = req.body;
    validateSignupData(req);
    // check the email id is present or not . Id shoulds be unique
    const isEmailExist = await User.findOne({ email: email });
    console.log(isEmailExist, "checking data");
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

    const token = await user.getJWT()

      res.status(200).cookie("token", token)
      res.status(200).send(user);
    }
  } catch (err) {
    res.status(500).send("Error :" + err.message);
  }
});
/// get user Data

app.get("/user", async (req, res) => {
  try {
    const user = await User.find({ email: "baby@gmail.com" });
    res.status(200).send(user);
  } catch (err) {
    res.status(400).send("Mesasage=>", err.message);
  }
});

// Delete user from server

app.delete("/delete", async (req, res) => {
  try {
    const id = req.body.id;
    console.log(id, "id of user");
    await User.findByIdAndDelete(id);
    res.status(200).send("user deleted successfully!");
  } catch (err) {
    res.status(400).send("Error Message=>", err.message);
  }
});

// Update Data

app.patch("/user", async (req, res) => {
  try {
    const userId = req.body.userId;
    const data = req.body;

    const response = await User.findByIdAndUpdate(userId, data, {
      returnDocument: "after",
    });
    console.log(response);
    res.status(200).send("user updated successfully😊");
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// USER PROFILE

//  CREATE PROFILE

app.post("/profile", isUserAuthenticated, async (req, res) => {
    // console.log(req.user)
  const {
    userName,
    contact,
    gender,
    photos,
    skills,
    experienceLevel,
    github,
    projects
  } = req.body;
  try {
    const profile = await new UserProfile({
        userId:req.user._id,
        userName,
        contact,
        gender,
        photos,
        skills,
        experienceLevel,
        github,
        projects
    });

    await profile.save();
    res.status(200).send("profile created successfully😊");
  } catch (err) {
    res.status(400).send("Something went wrong" + err.message);
  }
});
//  Get profile
app.get("/my/profile", isUserAuthenticated, async (req, res) => {
    //   const userId = req.params.id;
    const userId = req.user._id
      try {
        const userData = await UserProfile.findOne({userId:userId});
        if(!userData){
            throw new Error("user not found please create user")
        }
        res.status(200).send(userData);
      } catch (err) {
        res.status(400).send("Error:-" + err.message);
      }
    });

/// Update user Profile ///

app.patch("/profile/udpdate/:userId", isUserAuthenticated, async (req, res) => {
  const userId = req.params.userId;
  const profileData = req.body;
//   console.log(profileData)
  try {
    const response = await UserProfile.findByIdAndUpdate(userId, profileData, {
      returnDocument: "after",
      runValidators: true,
    });
    res.status(200).send(response);
  } catch (err) {
    res.status(400).send("Something went wrong" + err.message);
  }
});



connectDB()
  .then(() => {
    console.log("Successflly connected to Database!!");

    // Frist connect server To db Then start Listening req . it is a good Practice
    app.listen("0118", () => {
      console.log("server is listening sucessfully on port 0118");
    });
  })
  .catch((err) => {
    console.log("Failed to connect Database", err);
  });
