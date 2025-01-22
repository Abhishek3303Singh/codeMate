import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/signupSlice";
const Header = () => {
    const {user, status,isAuthenticated,resError} = useSelector((state)=>state.signupUser)
    const dispatch = useDispatch()
    const handleLogout =()=>{
        dispatch(logout())
    }
    return (
        <>
            <div className="sticky top-0 z-50 grid grid-flow-col shadow-lg p-4 text-white
        bg-gradient-to-r from-[#090819] from-0% via-[#060917] via-30% via-[#030a0f] via-65% to-[#330626] to-100%...
        ">
                <div className="flex justify-center items-center col-span-1">
                    <Link to="/">
                        <h1 className="mx-3 font-bold text-3xl text-center cursor-pointer">Codemate</h1>
                        {/* <img src={logo} alt="Codemate" className="w-60 ml-0 h-12" /> */}
                    </Link>
                </div>
                <div className=" flex justify-start items-center col-span-5">
                    <ul class="flex mx-5 text-center text-white">
                        <Link to="/my/match">
                        <li class="relative mx-3 group">
                            <span class="cursor-pointer">Match</span>
                            <span class="absolute bottom-0 left-0 h-[3px] w-0 bg-pink-500 transition-all duration-300 group-hover:w-full"></span>
                        </li>
                        </Link>
                        <Link to="/support">
                        <li class="relative mx-3 group">
                            <span class="cursor-pointer">Support</span>
                            <span class="absolute bottom-0 left-0 h-[3px] w-0 bg-pink-500 transition-all duration-300 group-hover:w-full"></span>
                        </li>
                        </Link>
                        <li class="relative mx-3 group">
                            <span class="cursor-pointer">Learn</span>
                            <span class="absolute bottom-0 left-0 h-[3px] w-0 bg-pink-500 transition-all duration-300 group-hover:w-full"></span>
                        </li>
                    </ul>

                </div>
            {
                !isAuthenticated ? 
                <Link to="/login">
                <div className="col-span-1 border-yellow-300 bg-[#ff207e] text-center bg-gradient-to-br from-purple-500 to-pink-500
                                rounded-full text-lg w[10px]">

                    <h2 className="px-1 py-2 text-white font-bold text-xl cursor-pointer">Log in</h2>
                </div>
            </Link>
            :    
            <div className="col-span-1 border-yellow-300 bg-[#ff207e] text-center text-center bg-gradient-to-br from-purple-500 to-pink-500
                            rounded-full text-lg w[10px]" onClick={handleLogout}>

                <h2 className="px-1 py-2 text-white font-bold text-xl cursor-pointer">Logout</h2>
            </div>
      
            }
            </div>
        </>
    )
}

export default Header