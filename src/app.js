const express = require("express");
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const fileUpload = require('express-fileupload');
const app = express();
const {Server} = require("socket.io")
require("dotenv").config({ path: './config.env' });


const http = require("http")
const server = http.createServer(app);


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
//// Createing websocket server
const io = new Server(server,{
  cors: {
    origin: "http://localhost:3000", // our frontend URL
    credentials: true,
    methods: ["GET", "POST"],
},
})
// socket.io connection
io.on('connection',(socket)=>{
  // console.log("User connected: ", socket.id)
  // console.log("Current rooms: ", io.sockets.adapter.rooms);
  // Listen for the user joining there room
  socket.on('joinRoom',(userId)=>{
    socket.join(userId) // User joins a room named after their ID
    // console.log(`User joined room: ${userId}`)
  })
    // Listen for the 'interestSent' event
    socket.on('interestSent', (data) => {
      
      // console.log("Server received interestSent from user", socket.id);
  
      // Emit the real-time update to the room (or to all clients)
      // If we want to send it to a specific user, you can emit it to their room
      socket.emit('realTimeUpdate', { message: "User has shown interest!" });
  
      // Optionally we can also broadcast to other users in the room (if any)
      // io.to(userId).emit('realTimeUpdate', { message: "User has shown interest!" });
    });
  socket.on('disconnect',()=>{
    console.log('user disconnected')
  })
})

// Attached io to app object now io instance is globally available available 
app.set('io', io)
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
    server.listen(process.env.PORT, () => {
      console.log("server is listening sucessfully on port" + " "+process.env.PORT);
    });
  })
  .catch((err) => {
    console.log("Failed to connect Database", err);
  });
