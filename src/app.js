const express = require("express");
const connectDB = require("../src/cofig/database");
const cookieParser = require("cookie-parser");
const app = express();

// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// const {isUserAuthenticated} = require('./middleware/auth')
// const SECREATKEY = "PRIYAMeriJaanAbhi@Baby@0118";
// const User = require("./models/user");
// const UserProfile = require("./models/userProfile");



app.use(express.json())

app.use(cookieParser());

/// Auth Router
const userAuth = require("./routes/auth")

app.use("/", userAuth)

// User Router

const userRouter = require("./routes/userRoute")

app.use("/",userRouter)


///// Connection routes

const connectionRoute = require("./routes/connectionRequest")
app.use("/", connectionRoute)

// userData route 
const userData = require("./routes/userData")
app.use("/",userData)

// feed route

const feed = require("./routes/feed")
app.use("/", feed)







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
