const express = require("express");
const feedRoute = express.Router();
const ConnectionRequest = require("../models/connectionRequest");
const UserModel = require("../models/user");
const { isUserAuthenticated } = require("../middleware/auth");
const profileModel = require("../models/userProfile");

feedRoute.get("/feed", isUserAuthenticated, async (req, res) => {
  try {
    const page=req.query.page
    const limit=15
    // Find all connections of LoggedIn usere
    const loggedIn = req.user;
    const connectionReqs = await ConnectionRequest.find({
      $or: [{ senderId: loggedIn._id }, { receiverId: loggedIn._id }],
    });

    const hideUserFeed = []
       connectionReqs.forEach((usr) => {
      hideUserFeed.push(usr.senderId);
      hideUserFeed.push(usr.receiverId);
    });
    hideUserFeed.push(loggedIn._id);
    console.log(hideUserFeed);



    const feedUsers = await UserModel.find({
      $and: [{ _id: { $nin: hideUserFeed } }, { _id: {$ne:loggedIn._id} }],
    }).select("firstName lastName _id");
    const feedUserProfileArr = [];
    console.log(feedUserProfileArr, "feedArray");
    feedUsers.forEach((ele) => {
      feedUserProfileArr.push(ele._id);
    });
    const feedProfileData = await profileModel.find({
      userId: { $in: feedUserProfileArr },
    }).skip(page-1).limit(limit);
    return res.status(200).json({
        status:"success",
      data: feedProfileData,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
});

module.exports = feedRoute;
