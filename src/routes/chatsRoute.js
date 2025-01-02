const express = require("express")
const Chat = require("../models/chats")
const { isUserAuthenticated } = require("../middleware/auth");

const router = express.Router()

// First of all Fetch all the chats history if present 
// logic - > we will find the chat data on the basis of senderId or receiverId 

router.get("/chats/:senderId",isUserAuthenticated, async(req, res)=>{
 const {senderId} = req.params
 const receiverId = req.user._id
 try{
    const chats = await Chat.find({
        $or:[
            {senderId:senderId, receiverId:receiverId},
            {senderId:receiverId, receiverId:senderId}
        ]
    }).sort({timestamp:1})

    res.status(200).json({
        status:"success",
        data:chats
    })
 }
 catch(err){

    res.status(400).json({
        status:"failed",
        message:err.message
    })
 }
})


// send chat message
router.post("/chats", isUserAuthenticated, async (req, res) => {
    try {
      const { receiverId, text } = req.body;
      const senderId = req.user._id;
  
      const newChats = await new Chat({ senderId, receiverId, text });
      await newChats.save();
  
      const io = req.app.get("io");
      io.to(receiverId.toString()).emit("receiveMessage", {
        senderId,
        receiverId,
        text,
        timestamp: newChats.createdAt, // Include a timestamp
      });
  
      res.status(200).json({
        status: "success",
        data: newChats,
      });
    } catch (err) {
      res.status(400).json({
        status: "failed",
        message: err.message,
      });
    }
  });
  

module.exports = router