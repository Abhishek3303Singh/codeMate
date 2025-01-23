import React from 'react'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { connectionRequest } from '../store/requestSlice'
import { STATUSES } from '../store/signupSlice'
import Loader from './Loader'
import profile from "../images/profile.png"
const apiUrl = process.env.REACT_APP_API_URL;

const AllRequest = () => {
  const {request,status,resError} = useSelector((state)=>state.allRequest)
  const dispatch = useDispatch()
  const [requests,setRequests] = useState([])

  useEffect(()=>{

    dispatch(connectionRequest())
  },[dispatch])

  useEffect(()=>{

    if(request?.data){
      setRequests(request.data)
    }
  },[request])
 
  
  async function handleButton(id, status){
    try{
      const apiResponse = await fetch(`${apiUrl}/request/review/${status}/${id}`, {method:"post", credentials: 'include',})
      const responseJson = await apiResponse.json()
      if(responseJson.status==="success"){
        setRequests((prevRequests) => prevRequests.filter((req) => req._id !== id));
      }

    }
    catch(err){
      console.log(err.massage)
    }

  }


  if(status===STATUSES.LOADING){
    return(
      <Loader/>
    )
  }

  return (
   
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black py-10">
      <h1 className="text-center text-4xl font-bold text-white mb-8">All Requests</h1>
      <div className="container px-10 mx-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {requests?.map((req) => (
          <div
            key={req?._id}
            className="b-2 bg-gradient-to-br from-gray-800/40 to-gray-700/30 backdrop-blur-lg p-6 rounded-lg shadow-lg border border-gray-600 relative mx-1 mb-2"
          >
           
            <div className="flex items-center space-x-4">
              <img
                src={req?.senderProfileId?.photos[0]?.url|| profile}
                alt="profile"
                className="w-16 h-16 rounded-full border-2 border-gray-600"
              />
              <div>
                <h2 className="text-lg font-semibold text-white">{req?.senderId.firstName  || "Unknown"} {" "} {req?.senderId.lastName  || "User"}</h2>
                <p className="text-sm text-gray-400">{req?.senderProfileId?.userName || "User_Nmae"}</p>
              </div>
            </div>
            <div className="mt-6 flex justify-between">
              <button
                onClick={() => handleButton(req?._id, "accepted")}
                className="px-4 py-2 bg-green-600 text-white font-medium rounded-md shadow-md hover:bg-green-700 transition"
              >
                Accept
              </button>
              <button
                onClick={() => handleButton(req?._id, "rejected")}
                className="px-4 py-2 bg-red-600 text-white font-medium rounded-md shadow-md hover:bg-red-700 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        ))}

        {/* No Requests */}
        {requests?.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center text-center">
            <h2 className="text-xl font-bold text-gray-400">No Requests Found</h2>
            <p className="text-gray-500">You have no pending connection requests at the moment.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default AllRequest