const express = require("express");
const router = express.Router();
const User = require("../models/user")
const UserProfile= require("../models/userProfile")
const {isUserAuthenticated} = require("../middleware/auth")
//  CREATE PROFILE

router.post("/profile", isUserAuthenticated, async (req, res) => {
  // console.log(req.user)
  const {
    userName,
    contact,
    gender,
    photos,
    skills,
    experienceLevel,
    github,
    projects,
  } = req.body;
  try {
    const profile = await new UserProfile({
      userId: req.user._id,
      userName,
      contact,
      gender,
      photos,
      skills,
      experienceLevel,
      github,
      projects,
    });

    await profile.save();
    res.status(200).send("profile created successfully😊");
  } catch (err) {
    res.status(400).send("Something went wrong" + err.message);
  }
});

router.get("/my/profile", isUserAuthenticated, async (req, res) => {
  //   const userId = req.params.id;
  const userId = req.user._id;
  try {
    const userData = await UserProfile.findOne({ userId: userId });
    if (!userData) {
      throw new Error("user not found please create user");
    }
    res.status(200).send(userData);
  } catch (err) {
    res.status(400).send("Error:-" + err.message);
  }
});

router.patch("/profile/udpdate/:userId", isUserAuthenticated, async (req, res) => {
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

module.exports = router;
