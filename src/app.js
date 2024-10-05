const express = require("express");
const connectDB = require("../src/cofig/database");
const User = require("./models/user");
const UserProfile = require("./models/userProfile")
const app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.json());

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

app.post("/login", (req, res) => {
  console.log(req.body);
  res.send("Login successfully!!");
});

// signup
app.post("/signup", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    res.status(200).send("user signUp sucessfully😎");
  } catch (err) {
    res.status(500).send("Error"+ err.message);
  }
});
/// get user Data
app.get('/user', async(req,res)=>{
    try{
        const user =await User.find({email:"baby@gmail.com"})
        res.status(200).send(user)
    }
    catch(err){
        res.status(400).send("Mesasage=>",err.message)
    }
    
})

// Delete user from server

app.delete("/delete", async(req, res)=>{
    try{
        const id = req.body.id
        console.log(id, "id of user")
        await User.findByIdAndDelete(id)
        res.status(200).send('user deleted successfully!')
    }catch(err){
        res.status(400).send("Error Message=>", err.message)
    }
})

// Update Data 

app.patch("/user", async(req, res)=>{
    try{
        const userId = req.body.userId
        const data = req.body

        const response = await User.findByIdAndUpdate(userId, data,{returnDocument:"after"})
        console.log(response)
        res.status(200).send("user updated successfully😊")
    }
    catch(err){
        res.status(400).send(err.message)

    }
})


// USER PROFILE 

//  CREATE PROFILE


app.post("/profile", async(req, res)=>{
    const profileData = req.body
    try{
        const profile = await new UserProfile(profileData)

        await profile.save()
        res.status(200).send("profile created successfully😊")
    }
    catch(err){
        res.status(400).send("Something went wrong"+err.message)
    }
   
})


/// Update user Profile /// 

app.patch('/update/profile', async(req, res)=>{
    const userId = req.body.userId
    const profileData = req.body
    try{
        const response = await UserProfile.findByIdAndUpdate(userId, profileData, {returnDocument:"after", runValidators:true})
        res.status(200).send(response)
    }
    catch(err){
        res.status(400).send("Something went wrong"+err.message)
    }

})

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
