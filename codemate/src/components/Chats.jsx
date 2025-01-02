import React, { useState } from "react";
import { closeChatBox } from "../store/toggleSlice";
import { useDispatch, useSelector } from "react-redux";
import useChat from "../utils/useChats";
import { debounce } from "lodash";

const Chats = ({ chatsWith }) => {
  const [newMessage, setNewMessage] = useState("");
  const dispatch = useDispatch();

  const { isAuthenticated, user: userData } = useSelector((state) => state.signupUser);

  let currentUserId, otherUserId;
  if (userData?.data?.id === chatsWith?.receiverId) {
    currentUserId = userData?.data?.id;
    otherUserId = chatsWith?.senderId;
  } else {
    currentUserId = userData?.data?.id;
    otherUserId = chatsWith?.receiverId;
  }

  const { messages, sendMessage, isTyping, notifyTyping } = useChat(currentUserId, otherUserId);
  // console.log(isTyping, 'isTyping')

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      try {
        await sendMessage(newMessage);
        setNewMessage("");
      } catch (error) {
        console.error("Failed to send message:", error);
      }
    }
  };

  const debouncedNotifyTyping = debounce((typing) => {
    // console.log("Debounced notify typing status:", typing);
    notifyTyping(typing);
  }, 300);

  function closeChatBoxHandler() {
    dispatch(closeChatBox());
  }

  if (!chatsWith) {
    return (
      <div className="fixed right-0 top-0 h-full w-2/3 md:w-1/3 bg-gray-800 shadow-lg z-50 transition-transform transform translate-x-0">
        <div className="flex flex-col h-full justify-center items-center">
          <p className="text-white">No active chat selected.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed right-0 top-0 h-full w-2/3 md:w-1/3 bg-gray-800 shadow-lg z-50 transition-transform transform translate-x-0">
  <div className="flex flex-col h-full">
    <div className="bg-gray-900 p-4 text-white flex justify-between items-center">
      <h2 className="text-lg font-semibold">
        Chat with {chatsWith?.senderProfileId?.userName || "User"}
      </h2>
      <button className="text-xl bg-red-600 px-2 text-black rounded-md hover:bg-red-700" onClick={closeChatBoxHandler}>
        ✖
      </button>
    </div>

    <div className="flex-1 p-4 overflow-y-auto">
      {messages?.length === 0 && (
        <p className="text-gray-400">Start a conversation here...</p>
      )}
      {messages?.map((msg, index) => (
        <div
          key={index}
          className={`flex ${msg.senderId === currentUserId ? 'justify-end' : 'justify-start'}`}
          style={{ margin: "5px 0" }} // Adding margin between messages
        >
          <span
            className="text-white p-2 rounded-lg"
            style={{
              backgroundColor: msg.senderId === currentUserId ? "green" : "black",
              maxWidth: "50%",
              wordBreak: "break-word" // Ensures long words break correctly
            }}
          >
            {msg?.text}
          </span>
          {/* <small className="text-gray-400">
      {new Date(msg.timestamp).toLocaleTimeString()}
    </small> */}
<small  className="text-gray-400">
  {msg.timestamp && !isNaN(Date.parse(msg.timestamp))
    ? new Date(msg.timestamp).toLocaleTimeString()
    : " "}
</small>

        </div>
      ))}
      {isTyping && <p className="text-green-500" aria-live="polite">Typing...</p>}
    </div>

    <div className="p-4 bg-gray-900 flex items-center">
      <input
        type="text"
        value={newMessage}
        onChange={(e) => {
          setNewMessage(e.target.value);
          // notifyTyping(true);
          debouncedNotifyTyping(true);
        }}
        onBlur={() => notifyTyping(false)}
        placeholder="Enter text here..."
        aria-label="Type a message"
        className="flex-1 px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none"
      />
      <button
        onClick={handleSendMessage}
        aria-label="Send message"
        className="ml-4 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
      >
        Send
      </button>
    </div>
  </div>
</div>

  );
};

export default Chats;
