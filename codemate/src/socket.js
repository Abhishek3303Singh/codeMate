import {io} from "socket.io-client"

const SOCKET_URL = "http://localhost:118" // backend WebSocket URL


const socket = io(SOCKET_URL,{
    withCredentials:true
})

export default socket;

export const joinRoom = (userId) => {
    if (!userId) {
      console.error("User ID is missing. Cannot join room.");
      return;
    }
    socket.emit("joinRoom", userId);
    // console.log(`Sent joinRoom event for userId: ${userId}`);
  };
  