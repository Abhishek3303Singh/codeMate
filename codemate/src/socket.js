import {io} from "socket.io-client"
const apiUrl = process.env.REACT_APP_API_URL;

const SOCKET_URL = apiUrl // backend WebSocket URL


const socket = io(SOCKET_URL,{
    withCredentials:true,
    reconnectionAttempts:5 // trying reconnectiong 5 times
})
socket.on("connect", () => console.log("Socket connected:"));
socket.on("disconnect", () => console.warn("Socket disconnected"));
export default socket;


// join a user room
export const joinRoom = (userId) => {
    if (!userId) {
      console.error("User ID is missing. Cannot join room.");
      return;
    }
    socket.emit("joinRoom", userId);
    // console.log(`Sent joinRoom event for userId: ${userId}`);
  };
  //send a message
  export const sendMessage = (senderId, receiverId, text) => {
    console.log(text, 'text')
    if (!text.trim()) {
      console.error("Cannot send an empty message");
      return;
    }
    socket.emit("sendMessage", { senderId, receiverId, text });
  };

  // Listen for incoming messages
socket.on("receiveMessage", (data) => {
  console.log("New message received:", data);
  // Update your chat UI with the new message
});