import { useState, useEffect } from "react";
import socket from "../socket";
const apiUrl = process.env.REACT_APP_API_URL;

const useChat = (currentUserId, otherUserId) => {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (!currentUserId) return;

    // Join room --> login user
    socket.emit("joinRoom", currentUserId);

    // Fetch existing messages or chat history..
    const fetchMessages = async () => {
      try {
        const response = await fetch(
          `${apiUrl}/chats/${otherUserId}`,
          {
            credentials: "include",
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch messages");
        }
        const responseJson = await response.json();
        // console.log(responseJson?.data, "Fetched messages");
        // Sort messages by createdAt before setting state
        // const sortedMessages = (responseJson?.data || []).sort(
        //   (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        // );
        setMessages(responseJson?.data || []);
        // setMessages(sortedMessages);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();

    // Listen for new messages
    socket.on("receiveMessage", (newMessage) => {
      //   console.log(newMessage, "Received new message");
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    
    });

    // Listen for typing event
    socket.on("userTyping", ({ typingUserId, isTyping: typing }) => {
      // console.log("Updating isTyping:", typing)
      if (typingUserId === otherUserId) {
        // console.log("Updating isTyping:", typing)
        setIsTyping(typing);
        // setTimeout(() => setIsTyping(false), 1000); // Clear typing indicator after 1s
      }
    });

    return () => {
      socket.off("receiveMessage");
      socket.off("userTyping");
    };
  }, [currentUserId, otherUserId]);

  const sendMessage = (text) => {
    const newMessage = {
      senderId: currentUserId,
      receiverId: otherUserId,
      text,
      timestamp: new Date().toISOString(), // Ensure consistent timestamp format
    };

    // Emit the message to the server
    socket.emit("sendMessage", newMessage);

    // No optimistic update here; rely on the real-time event
  };

  const notifyTyping = (typing) => {
    // console.log("Notify typing status:", typing);
    // const data = { senderId: currentUserId, receiverId: otherUserId, isTyping:typing }
    socket.emit("typing", {
      senderId: currentUserId,
      receiverId: otherUserId,
      isTyping: typing,
    });
    // console.log("Notify typing status2:", data);
  };

  return { messages, sendMessage, isTyping, notifyTyping };
};

export default useChat;
