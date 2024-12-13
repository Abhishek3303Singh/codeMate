import React from 'react'
import { FiUsers, FiMail, FiBell, FiSettings } from "react-icons/fi";
import { useSelector } from 'react-redux';
import Loader from './Loader';
import { useEffect } from 'react';
import { STATUSES } from '../store/signupSlice';
import profile from "../images/profile.png"
import {useNavigate} from "react-router-dom"

const Sidebar = () => {
  const { user, status, resErr, isCreated } = useSelector((state) => state.profileData)
  const {isAuthenticated ,user:userData} = useSelector((state)=>state.signupUser)
  const navigate = useNavigate()

  useEffect(()=>{
    
  },[status, user])

function handleCreateProfile(){
  if(isCreated){
    navigate("/edit/profile")
  }else{
    navigate("create/profile")
  }
}
  if(status===STATUSES.LOADING){
    return(
      <Loader/>
    )
  }
  return (
    <>
    <div className=" fixed h-screen w-80 bg-gradient-to-r from-[#18031b] from-0% via-[#030f46] via-30% via-[#a8046c] via-65% to-[#330626] to-100%... shadow-lg flex flex-col items-center pt-10">
  {/* Profile Section */}
  <div className="flex flex-col items-center space-y-4">
    <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 p-1 shadow-lg">
    
      <img
        src={isCreated?user && user?.data?.photos[0]?.url:profile}
        alt="Profile"
        className="w-full h-full rounded-full object-cover object-top border-2 border-gray-900"
      />
    </div>
    <h2 className="text-xl font-semibold text-white tracking-wide">{user && user?.data?.userName}</h2>
    <h2 className="text-xl font-semibold text-white tracking-wide">{userData && userData?.data?.firstName} {" "} {userData && userData?.data?.lastName}</h2>
    <button onClick={handleCreateProfile}
      className="text-sm text-gray-200 bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-1 rounded-full shadow-md 
      hover:from-pink-600 hover:to-red-600 hover:shadow-lg transition-all"
    >
      {
        isCreated? "Edit Profile" : "Create Profile"
      }
     
    </button>
  </div>

  {/* Menu Options */}
  <div className="mt-10 w-full">
    <ul className="flex flex-col space-y-6 items-start">
      {/* Connections */}
      <li className="flex items-center space-x-4 px-6 py-3 group cursor-pointer">
        <span className="text-white text-2xl group-hover:text-pink-500 transition-colors">
          <FiUsers />
        </span>
        <span
          className="text-lg font-medium text-gray-300 group-hover:text-white transition-all"
        >
          My Connections
        </span>
      </li>
      {/* Requests */}
      <li className="flex items-center space-x-4 px-6 py-3 group cursor-pointer">
        <span className="text-white text-2xl group-hover:text-blue-500 transition-colors">
          <FiMail />
        </span>
        <span onClick={()=>navigate("/all/request")}
          className="text-lg font-medium text-gray-300 group-hover:text-white transition-all"
        >
          Interested
        </span>
      </li>
      {/* Notifications */}
      <li className="flex items-center space-x-4 px-6 py-3 group cursor-pointer">
        <span className="text-white text-2xl group-hover:text-green-500 transition-colors">
          <FiBell />
        </span>
        <span
          className="text-lg font-medium text-gray-300 group-hover:text-white transition-all"
        >
          Notifications
        </span>
      </li>
      {/* Settings */}
      <li className="flex items-center space-x-4 px-6 py-3 group cursor-pointer">
        <span className="text-white text-2xl group-hover:text-yellow-500 transition-colors">
          <FiSettings />
        </span>
        <span
          className="text-lg font-medium text-gray-300 group-hover:text-white transition-all"
        >
          Settings
        </span>
      </li>
    </ul>
  </div>

  {/* Logout */}
  <div className="mt-auto mb-6">
    <button
      className="w-48 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white font-medium rounded-full shadow-md 
      hover:from-red-600 hover:to-pink-600 hover:shadow-lg transition-all"
    >
      Logout
    </button>
  </div>
</div>

    
    </>
  )
}

export default Sidebar