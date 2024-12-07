const express = require("express");
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const fileUpload = require('express-fileupload');
const app = express();
require("dotenv").config({ path: './config.env' });

app.use(cors({
  credentials: true
}));
// console.log(process.env.MONGO_DB_PORT)
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// const {isUserAuthenticated} = require('./middleware/auth')
// const SECREATKEY = "PRIYAMeriJaanAbhi@Baby@0118";
// const User = require("./models/user");
// const UserProfile = require("./models/userProfile");
app.use(fileUpload());
const cloudinary = require("cloudinary").v2;

          
cloudinary.config({ 
  cloud_name:process.env.CLOUD_NAME, 
  api_key:process.env.API_KEY, 
  api_secret:process.env.API_SECRET 
});

// app.use(express.json())
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

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
    app.listen(process.env.PORT, () => {
      console.log("server is listening sucessfully on port" + " "+process.env.PORT);
    });
  })
  .catch((err) => {
    console.log("Failed to connect Database", err);
  });
