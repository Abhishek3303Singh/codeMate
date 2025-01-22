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
    req.body.photos = imageLinks;

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
      status: "success",
      data: data,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
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
      status: "success",
      data: userData,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
});

router.post(
  "/profile/udpdate/:userId",
  isUserAuthenticated,
  async (req, res) => {
    const userId = req.params.userId;

    const userProfileFetch = await UserProfile.findById(userId)
    const oldPhotos = userProfileFetch.photos || []
    // console.log(oldPhotos, 'oldphotos')
    
      // console.log(userId, req.body, 'checking response')
    const { photos } = req.body;
    // console.log(photos, 'photos')
    try {
      if (photos.length > 0) {
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
        req.body.photos = [...imageLinks, ...oldPhotos];
      }
      else{
        delete req.body.photos
      }
      const response = await UserProfile.findByIdAndUpdate(
        userId,
        req.body,
        {
          returnDocument: "after",
          runValidators: true,
        }
      );
      res.status(200).json({
        status:"success",
        data:response
      });
    } catch (err) {
      res.status(400).json({
        status:"failed",
        message:err.message
      });
    }
  }
);

module.exports = router;
