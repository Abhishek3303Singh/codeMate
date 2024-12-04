import React from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import profilePic from "../images/profile.jpg"

const FeedCard = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
  {/* Card */}
  <div className="relative w-80 h-[600px] bg-gradient-to-br from-gray-800/40 to-gray-700/30 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden border border-gray-500/30">
    {/* Image */}
    <div className="relative w-full h-[60%]">
      <img
        src={profilePic}
        alt="Profile"
        className="w-full rounded-t-2xl h-full object-top object-cover"
      />
      {/* Futuristic Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/0 opacity-90"></div>
      <h3 className="absolute bottom-4 left-4 text-2xl font-semibold drop-shadow-lg">
        Priya Sharma
      </h3>
    </div>

    {/* Content */}
    <div className="p-6 flex flex-col space-y-4">
      <p className="text-gray-300 text-sm">
        A passionate developer specializing in React, Node.js, and futuristic technologies.
      </p>
      <div className="flex space-x-4">
        <span className="px-4 py-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-sm font-semibold shadow-md">
          #React
        </span>
        <span className="px-4 py-1 bg-gradient-to-r from-blue-500 to-green-500 rounded-full text-sm font-semibold shadow-md">
          #Node.js
        </span>
      </div>
    </div>

    {/* Swipe Buttons */}
    <div className="absolute bottom-4 left-0 right-0 flex justify-around px-4">
      {/* Left Swipe */}
      <button
        className="w-14 h-14 bg-gradient-to-br from-red-500 to-red-700 text-white rounded-full flex items-center justify-center
        hover:from-red-600 hover:to-red-800 shadow-xl transform transition-transform duration-300 hover:scale-125"
      >
        <FiArrowLeft size={24} />
      </button>
      {/* Right Swipe */}
      <button
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
