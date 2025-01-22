import { useState, useEffect } from "react";
import socket from "../socket";
 
const useOnlineStatus =(currentUserId)=>{
    const [onlineUsers, setOnlineUsers] = useState([])


    useEffect(()=>{
        if(!currentUserId){
            return
        }
        // join the room
        socket.emit("joinRoom", currentUserId)

        // Listening for updates about online users who is online or who is discconnecting
        socket.on("updateOnlineUsers", (users)=>{
            // console.log("Online Users:", users);
            setOnlineUsers(users);

        })

        return ()=>{
            socket.off("updateOnlineUsers")
        }

    },[currentUserId])

    // finding the user is online or not 

    const isUserOnline = (userId)=>onlineUsers.includes(userId)


    return {onlineUsers, isUserOnline}
}

export default useOnlineStatus;