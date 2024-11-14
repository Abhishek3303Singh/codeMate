const express = require("express")
const feedRoute = express.Router()
const ConnectionRequest = require("../models/connectionRequest")
const UserModel = require("../models/user")
const {isUserAuthenticated} = require("../middleware/auth")
const profileModel = require("../models/userProfile")
 
feedRoute.get("/feed",isUserAuthenticated, async(req, res)=>{
    // Find all connections of LoggedIn usere
    const loggedIn = req.user
    const connectionReqs = await ConnectionRequest.find({
        $or:[
            {senderId:loggedIn._id},
            {receiverId:loggedIn._id}
        ]
    })

    const hideUserFeed = new Set()
    connectionReqs.forEach(usr=>{
        hideUserFeed.add(usr.senderId.toString());
        hideUserFeed.add(usr.receiverId.toString())
    })

    const hideFeedArr = Array.from(hideUserFeed)

    const feedUsers = await UserModel.find({
        $and:[{_id:{$nin:hideFeedArr}}, {_id:loggedIn._id}]
    }).select("firstName lastName _id")
 const feedUserProfileArr = []
 feedUsers.forEach(ele=>{
    feedUserProfileArr.push(ele._id)
 }) 
 const feedProfileData = await profileModel.find({
    userId:{ $in:feedUserProfileArr}
 })
    return res.status(400).json({
        data:feedProfileData
    })


})

module.exports = feedRoute