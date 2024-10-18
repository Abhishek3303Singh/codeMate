const express = require("express");
const ConnectionRequest = require("../models/connectionRequest");
const { isUserAuthenticated } = require("../middleware/auth");

const router = express.Router();

router.post(
  "/request/send/:status/:senderId",
  isUserAuthenticated,
  async (req, res) => {
    try {
      const senderId = req.params.senderId;
      const receiverId = req.user._id;
      const status = req.params.status;
     
      // validate data

      const allowedStatus = ["interested", "ignored"];
      const isAllowed = allowedStatus.includes(status);
      if (!isAllowed) {
        return res.status(400).json({
          message: `Invalid status type : ${status}`,
        });
      }
      const connection = new ConnectionRequest({
        senderId,
        receiverId,
        status,
      });
      await connection.save();
      res.status(200).json({
        message: `connection req sent to ${req.user.firstName} successfully `,
        status: "success",
      });
    } catch (err) {
      res.status(400).json({
        message: "Error" + err.message,
        status: "Faield",
      });
    }
  }
);

module.exports = router;
