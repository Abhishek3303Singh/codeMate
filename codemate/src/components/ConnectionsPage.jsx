import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { STATUSES, getAllconnection } from "../store/connectionSlice";
import Loader from "./Loader";
import { FaRegComments, FaUserCircle } from "react-icons/fa";
import Chats from "./Chats";
import { toggle } from "../store/toggleSlice";
import useOnlineStatus from "../utils/useOnlineStatus";
import { useNavigate } from "react-router-dom";

const ConnectionsPage = () => {
    const [searchQuery, setSearchQuery] = useState("");
    // const [showChatBox, setShowChatBox] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);


    const { isAuthenticated, user: userData } = useSelector((state) => state.signupUser)
    const { connection, status, resError } = useSelector((state) => state.myConnection)
    const { isChatBoxOpen } = useSelector((state) => state.toggle)

    const {isUserOnline} = useOnlineStatus(userData?.data?.id)

    const navigate = useNavigate()

    const dispatch = useDispatch()
    // Fetching accepted connections (replace with your API endpoint)
    useEffect(() => {
        dispatch(getAllconnection())

    }, [dispatch]);

    function handleChatBox(user){
        dispatch(toggle())
        setSelectedUser(user)
    }

    function handleUserDetail(user){
        navigate("/profile/details", {state:{user}})
    }

    if (status === STATUSES.LOADING) {
        return (
            <Loader />
        )
    }

    return (
        <div className="ml-4 min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black py-5">
            <h1 className="text-center text-4xl font-bold text-white mb-5">Connections</h1>
            <div className="container px-10 mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {connection?.data?.map((user) => (
                    <div
                        key={user._id}
                        className="bg-gradient-to-br from-gray-800/40 to-gray-700/30 backdrop-blur-lg p-6 rounded-lg shadow-lg border border-gray-600 relative"
                    >
                        {userData?.data?.id === user?.senderId ?

                            <div className="flex items-center space-x-4">
                                <div className="w-16 h-16">
                                    <img
                                        src={user?.receiverProfileId?.photos[0]?.url || ""}
                                        alt=""
                                        className="w-full h-full rounded-full object-cover object-top border-2 border-gray-900"
                                    />
                                </div>
                                <div className="flex-1 overflow-hidden">
                                    <h2 className="text-lg font-semibold text-white truncate">
                                        {user?.receiverProfileId?.userName || "Unknown User"}
                                    </h2>
                                    <p className="text-sm text-gray-400 line-clamp-2">
                                        {user?.receiverProfileId?.about || "No description provided."}
                                    </p>
                                    <p
                                        className={`text-xs ${ isUserOnline(user?.receiverId) ? "text-green-500 font-bold" : "text-gray-500"
                                            }`}
                                    >
                                        {isUserOnline(user?.receiverId) ? "Online" : "Offline"}
                                    </p>
                                </div>
                            </div>

                            :

                            <div className="flex items-center space-x-4">
                                <div className="w-16 h-16">
                                    <img
                                        src={user?.senderProfileId?.photos[0]?.url || ""}
                                        alt=""
                                        className="w-full h-full rounded-full object-cover object-top border-2 border-gray-900"
                                    />
                                </div>
                                <div className="flex-1 overflow-hidden">
                                    <h2 className="text-lg font-semibold text-white truncate">
                                        {user?.senderProfileId?.userName || "Unknown User"}
                                    </h2>
                                    <p className="text-sm text-gray-400 line-clamp-2">
                                        {user?.senderProfileId?.about || "No description provided."}
                                    </p>
                                    <p
                                        className={`text-xs ${isUserOnline(user?.senderId) ? "text-green-500 font-bold" : "text-gray-500"
                                            }`}
                                    >
                                        {isUserOnline(user?.senderId) ? "Online" : "Offline"}
                                    </p>
                                </div>
                            </div>
                            


                        }

                        <div className="mt-3 flex justify-between">
                            <button onClick={()=>handleChatBox(user)}
                                className="p-3 bg-gradient-to-r from-green-400 to-green-500 rounded-full shadow-lg hover:scale-110 transition-transform"
                            >
                                <FaRegComments className="text-white text-lg" />
                            </button>
                            <button onClick={()=>handleUserDetail(user)}
                                className="p-3 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full shadow-lg hover:scale-110 transition-transform"
                            >
                                <FaUserCircle className="text-white text-lg" />
                            </button>
                        </div>
                    </div>
                ))}
                {connection?.data?.length === 0 && (
                    <div className="col-span-full flex flex-col items-center justify-center text-center">
                        <h2 className="text-xl font-bold text-gray-400">No Connections Found</h2>
                        <p className="text-gray-500">
                            You haven’t connected with anyone yet.
                        </p>
                    </div>
                )}
            </div>
            <div>
                {
                    isChatBoxOpen && (
                        <Chats chatsWith={selectedUser} />
                    )
                }
             

            </div>

        </div>

    );
};

export default ConnectionsPage;
