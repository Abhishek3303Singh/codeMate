import React, { useEffect, useState } from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { STATUSES } from "../store/signupSlice";
import { feedData } from "../store/feedSlice";
import Loader from "./Loader";
import { toast } from "react-toastify"
import socket, { joinRoom } from "../socket";

const FeedCard = () => {
  const dispatch = useDispatch();
  const { status, feed, resError } = useSelector((state) => state.feed);
  const { isAuthenticated, user: userData } = useSelector((state) => state.signupUser)
  const [currentFeed, setCurrentFeed] = useState([]);
  const [realTimeUpdate, setRealTimeUpdate] = useState([]);


  useEffect(() => {
 
    const userId = userData?.data?.id;
    // Log the socket connection status
    socket.on('connect', () => {
      console.log('Socket connected:', socket.id);
    });
  
    socket.on('disconnect', () => {
      console.log('Socket disconnected');
    });
  
    // Register the user
    socket.emit('register', userId);
  
    return () => {
      socket.off('connect');
      socket.off('disconnect');
    };
  }, [userData]);
  useEffect(() => {
    // Set up the real-time update listener

    // JOINING ROOM//
    const userId = userData?.data?.id;
    if (userId) {
      joinRoom(userId);
      console.log("Socket connected:", socket.id);
    }
    

    const handleRealTimeUpdate = (update) => {
      console.log("Received real-time data:", update);
      setRealTimeUpdate((prev) => [...prev, update]);
      toast.info(update.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        toastClassName: "Toastify__toast--success",
        progressStyle: {
          background: "white",
        },
      });
    };

    if (!socket.hasListeners("newConnectionRequest")) {

    // Listen for the 'newConnectionRequest' event comming from backend
      socket.on("newConnectionRequest", handleRealTimeUpdate);
      console.log("Listening for realTimeUpdate events");
    }

    // socket.on("realTimeUpdate", handleRealTimeUpdate);
    // console.log("Listening for realTimeUpdate events");

    return () => {
      socket.off("newConnectionRequest", handleRealTimeUpdate);
    };

  }, [userData])

 
  

  useEffect(() => {
    dispatch(feedData());

  }, [dispatch]);
  useEffect(() => {
    if (feed?.data && feed.data.length > 0) {
      setCurrentFeed(feed?.data)
    }
  }, [feed]);

  if (resError) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        <p>Something went wrong! Please try again later.</p>
      </div>
    );
  }
  if (status === STATUSES.LOADING && currentFeed.length === 0) {
    return <Loader />;
  }

  if (!currentFeed || currentFeed.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black mb-6">
        <div className="flex flex-col items-center p-6 rounded-2xl w-96 h-auto border-4 border-pink-500 bg-gradient-to-b from-gray-700 via-gray-800 to-gray-900 shadow-2xl">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2748/2748558.png" // Replace with a better "no data" icon if needed
            alt="No Data"
            className="w-32 h-32 mb-6"
          />
          <h1 className="font-bold text-2xl text-white mb-4 text-center">
            Oh no! No more data to show 😮
          </h1>
          <p className="text-gray-300 text-center mb-6">
            Looks like you’ve reached the end. Check back later for more updates!
          </p>
          <button
            onClick={() => window.location.reload()} // Replace with your action, e.g., fetch new data
            className="px-6 py-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-transform transform hover:scale-105"
          >
            Refresh Feed
          </button>
        </div>
      </div>

    );
  }

  // / handle pass
  const handleIgnored = async () => {
    try {
      await fetch(`http://localhost:118/request/send/ignored/${currentFeed[0]?.userId}`, { method: "post", credentials: "include", });
      setCurrentFeed((prev) => prev.slice(1)); // Remove the first index user from Array
    } catch (error) {
      console.error("Error passing user:", error);
    }
  };

  const handleInterested = async () => {
    try {
      const apiRes = await fetch(`http://localhost:118/request/send/interested/${currentFeed[0]?.userId}`, { method: "post", credentials: "include", });
      
      const apiResJson = await apiRes.json()
      // console.log(apiResJson, 'intrested res')
      if (socket && socket.connected) {
        const userId = userData?.data?.id
        socket.emit("interestSent", { userId });
        // socket.emit("realTimeUpdate", { message: "Test message" });  // Test event
      console.log("Socket connected and interestSent emitted");
        console.log("Socket connected");
      } else {
        console.log("Socket not connected");
      }
      setCurrentFeed((prev) => prev.slice(1)); // Remove the first index user from Array
      if( apiResJson && apiResJson?.status==="failed"){
        toast.error(apiResJson?.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
          toastClassName: "Toastify__toast--error",
          progressStyle: {
            background: "rgb(255, 0, 0)",
          },
        })
      }else{
        toast.success("Request sent", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
          toastClassName: "Toastify__toast--seccess",
          progressStyle: {
            background: "#0dff3e",
          },
        })
        
      }

    } catch (error) {
      console.error("Error accepting user:", error);
    }
  };


  const user = currentFeed[0];

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white mb-10">
      <div
        key={user._id}
        className="relative w-80 h-[600px] bg-gradient-to-br from-gray-800/40 to-gray-700/30 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden border border-gray-500/30 mb-6"
      >
        <div className="relative w-full h-[60%]">
          <img
            src={user?.photos[0]?.url || "fallback-image-url"}
            alt={user.userName || "Profile"}
            className="w-full rounded-t-2xl h-full object-top object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/0 opacity-90"></div>
          <h3 className="absolute bottom-10 left-4 text-2xl font-semibold drop-shadow-lg">
            {user?.userName || "Unknown User"}
          </h3>
          <h3 className="absolute bottom-2 left-4 text-lg font-semibold drop-shadow-lg">
            Experience : {user?.experienceLevel || "New Developer"}
          </h3>
        </div>
        <div className="p-6 flex flex-col space-y-4">
          <p className="text-white text-sm">{user?.about || "No bio available."}</p>
          <div className="flex flex-wrap">
            {user?.skills.slice(0, 4).map((tag, index) => (
              <span
                key={index}
                className="px-4 mr-2 mb-2 py-1 bg-gradient-to-r from-green-500 to-pink-500 rounded-full text-sm font-semibold shadow-md"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-around px-4">
          <button
            onClick={handleIgnored}
            className="w-14 h-14 bg-gradient-to-br from-red-500 to-red-700 text-white rounded-full flex items-center justify-center
              hover:from-red-600 hover:to-red-800 shadow-xl transform transition-transform duration-300 hover:scale-125"
          >
            <FiArrowLeft size={24} />
          </button>
          <button
            onClick={handleInterested}
            className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-700 text-white rounded-full flex items-center justify-center
              hover:from-green-600 hover:to-green-800 shadow-xl transform transition-transform duration-300 hover:scale-125"
          >
            <FiArrowRight size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
