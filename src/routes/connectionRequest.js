const express = require("express");
const ConnectionRequest = require("../models/connectionRequest");
const { isUserAuthenticated } = require("../middleware/auth");
const User = require("../models/user");
const UserProfile = require("../models/userProfile");
const router = express.Router();
// api for send connection request
router.post(
  "/request/send/:status/:senderId",
  isUserAuthenticated,
  async (req, res) => {
    // const io = req.app.io;
    const io = req.app.get('io');

    try {
      const receiverId = req.params.senderId;
      // console.log(receiverId);
      const senderId = req.user._id;
      const status = req.params.status;
      const senderProfileId = await UserProfile.findOne({
        userId: senderId,
      });
      const receiverProfileId = await UserProfile.findOne({
        userId: receiverId,
      });

      // validate data

      const allowedStatus = ["interested", "ignored"];
      const isAllowed = allowedStatus.includes(status);
      if (!isAllowed) {
        return res.status(400).json({
          message: `Invalid status type : ${status}`,
        });
      }
      // checking existing connection req betwen sender to receiver or receiver to sender if there we blocked them
      const exsistConnection = await ConnectionRequest.findOne({
        $or: [
          { senderId, receiverId },
          { senderId: receiverId, receiverId: senderId },
        ],
      });
      if (exsistConnection) {
        return res.status(400).json({
          status:"failed",
          message: "Request already exist",
        });
      }

      // checking sender id present in my Db or not if id is not from my db i blocked them

      const isSenderIdValid = await User.findById(senderId);
      if (!isSenderIdValid) {
        return res.status(404).json({
          message: "User doesn't exist",
        });
      }
      // checking and blocking self request
      if (senderId.equals(receiverId)) {
        return res.status(404).json({
          message: "can't send request to yourself",
        });
      }
      const connection = new ConnectionRequest({
        senderId,
        receiverId,
        status,
        senderProfileId,
        receiverProfileId,
      });
      await connection.save();
      // Emit WebSocket Event
      if (!io) {
        console.log('Socket.io instance not found!');
        return res.status(500).json({ message: 'Socket.io not initialized', status: 'Failed' });
      }
      // console.log(receiverId.toString(), "receiver id ");
      // console.log("Rooms:", io.sockets.adapter.rooms);
    
      io.to(receiverId.toString()).emit("newConnectionRequest", {
        senderId,
        receiverId,
        message: `${req.user.firstName} ${status} ${
          status === "interested" ? "in" : ""
        } you `,
      
      });
      // console.log(`Emitting newConnectionRequest to room: ${receiverId}`);

      res.status(200).json({
        message: `${req.user.firstName} ${status} ${
          status === "interested" ? "in" : ""
        } you `,
        status: "success",
      });
    } catch (err) {
      res.status(400).json({
        message: err.message,
        status: "failed",
      });
    }
  }
);

// Api for receive connection request
router.post(
  "/request/review/:status/:requestedId",
  isUserAuthenticated,
  async (req, res) => {
    // checking allowed status

    try {
      // console.log("Running")
      const loggedInUser = req.user;
      const { status, requestedId } = req.params;
      const allowedStatus = ["accepted", "rejected"];
      const isAllowed = allowedStatus.includes(status);
      if (!isAllowed) {
        return res.status(400).json({
          status: "failed",
          message: "status is not allowed",
        });
      }
      const isConnectionRequest = await ConnectionRequest.findOne({
        _id: requestedId,
        receiverId: loggedInUser._id,
        status: "interested",
      });
      if (!isConnectionRequest) {
        return res.status(404).json({
          status: "failed",
          message: "connection is not possible",
        });
      } else {
        isConnectionRequest.status = status;
        isConnectionRequest.save();
        return res.status(200).json({
          status: "success",
          data: "Connection successfully",
        });
      }
    } catch (err) {
      res.status(400).json({
        status: "failed",
        message: "Error: " + err.message,
      });
    }

    // checking loggedin user in and requestedid with valid id present in my db or not.
  }
);

module.exports = router;
