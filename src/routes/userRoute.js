const express = require("express");
const router = express.Router();
const User = require("../models/user");
const UserProfile = require("../models/userProfile");
const { isUserAuthenticated } = require("../middleware/auth");
const cloudinary = require("cloudinary");
//  CREATE PROFILE

router.post("/profile", isUserAuthenticated, async (req, res) => {
  // console.log(req.body, 'checking data')


  try {
    let images = [];
    if (typeof req.body.photos === "string") {
      images.push(req.body.photos);
    } else {
      images = req.body.photos;
    }
    const imageLinks = [];
    for (let i = 0; i < images.length; i++) {
      const resData = await cloudinary.v2.uploader.upload(images[i], {
        folder: "codemateProfile",
      });
      imageLinks.push({
        public_id: resData.public_id,
        url: resData.secure_url,
      });
    }
    req.body.photos=imageLinks

    const {
      userName,
      contact,
      about,
      gender,
      photos,
      skills,
      experienceLevel,
      github,
      projects,
    } = req.body;
    // console.log(req.body, 'checking data2')
    const profile = await new UserProfile({
      userId: req.user._id,
      userName,
      contact,
      about,
      gender,
      photos,
      skills,
      experienceLevel,
      github,
      projects,
    });

    const data = await profile.save();
    res.status(200).json({
      status:"success",
      data:data
    });
  } catch (err) {
    res.status(400).json({
      status:"failed",
      message:err.message
    });
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
    res.status(200).json({
      status:"success",
      data:userData
    });
  } catch (err) {
    res.status(400).json({
      status:"failed",
      message:err.message
    });
  }
});

router.patch(
  "/profile/udpdate/:userId",
  isUserAuthenticated,
  async (req, res) => {
    const userId = req.params.userId;
    const profileData = req.body;
    //   console.log(profileData)
    try {
      const response = await UserProfile.findByIdAndUpdate(
        userId,
        profileData,
        {
          returnDocument: "after",
          runValidators: true,
        }
      );
      res.status(200).send(response);
    } catch (err) {
      res.status(400).send("Something went wrong" + err.message);
    }
  }
);

module.exports = router;
