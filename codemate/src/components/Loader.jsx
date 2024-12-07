import React from 'react'

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="relative">
        {/* Outer rotating circle */}
        <div className="w-32 h-32 border-8 border-transparent border-t-pink-500 border-r-blue-500 rounded-full animate-spin-fast"></div>
        {/* Inner glowing dot */}
        <div className="absolute top-0 left-0 w-32 h-32 flex items-center justify-center">
          <div className="w-9 h-9 bg-blue-500 rounded-full animate-pulse shadow-lg shadow-pink-500"></div>
        </div>
      </div>
    </div>
  )
}

export default Loader