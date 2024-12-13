const express = require("express")
const ConnectionRequest = require("../models/connectionRequest")
const userRaoute = express.Router()
const {isUserAuthenticated} = require("../middleware/auth")


// get all the received connection resquest which is intersted
userRaoute.get("/my/all/request", isUserAuthenticated, async(req, res)=>{
    try{
        const loggedInUser = req.user
        // status must be interested 
        // console.log("running")

        const connectionReq = await ConnectionRequest.find({
        receiverId:loggedInUser._id , status:"interested"
        }).populate("senderProfileId", "userName photos").populate("senderId", "firstName lastName")
        if(!connectionReq){
            return res.status(404).json({
                message:"No connection request found"
            })
        }
        return res.status(200).json({
            status:"success",
            data:connectionReq
        })

    }
    catch(err){
        return res.status(400).json({
            message:"Error: " +err.message
        })
    }
})
//Api to get all connection which is accepted

userRaoute.get("/my/connection", isUserAuthenticated, async(req, res)=>{
    try{
        // steps -> 1. Status must be Accepted,
    // 2.-> Loggedin user either SenderId Or ReceiverId
    // Dosen't matter whose send the req if status is accepted then connection made successfully
    const loggedInUser = req.user
    const connections = await ConnectionRequest.find({
        $or:[
            {senderId:loggedInUser._id, status:"accepted"},
            {receiverId:loggedInUser._id, status:"accepted"}
        ]
    }).populate("senderProfileId", "userName").populate("receiverProfileId", "userName")

    return res.status(200).json({
        data:connections
    })

    }catch(err){
        res.status(400).json({
            message:"Error : "+err.message
        })
    }
})
module.exports = userRaoute