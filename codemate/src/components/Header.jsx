import React from "react";
import { Link } from "react-router-dom";
const Header = () => {
    return (
        <>
            <div className="grid grid-flow-col shadow-lg p-4 text-white
        bg-gradient-to-r from-[#090819] from-0% via-[#060917] via-30% via-[#030a0f] via-65% to-[#330626] to-100%...
        ">
                <div className="flex justify-center items-center col-span-1">
                    <Link to="/">
                        <h1 className="mx-3 font-bold text-3xl text-center cursor-pointer">Codemate</h1>
                    </Link>
                </div>
                <div className=" flex justify-start items-center col-span-5">
                    <ul class="flex mx-5 text-center text-white">
                        <li class="relative mx-3 group">
                            <span class="cursor-pointer">Match</span>
                            <span class="absolute bottom-0 left-0 h-[3px] w-0 bg-pink-500 transition-all duration-300 group-hover:w-full"></span>
                        </li>
                        <li class="relative mx-3 group">
                            <span class="cursor-pointer">Support</span>
                            <span class="absolute bottom-0 left-0 h-[3px] w-0 bg-pink-500 transition-all duration-300 group-hover:w-full"></span>
                        </li>
                        <li class="relative mx-3 group">
                            <span class="cursor-pointer">Learn</span>
                            <span class="absolute bottom-0 left-0 h-[3px] w-0 bg-pink-500 transition-all duration-300 group-hover:w-full"></span>
                        </li>
                    </ul>

                </div>
                <Link to="/login">
                    <div className="col-span-1 border-yellow-300 bg-[#ff207e] text-center
          rounded-full text-lg w[10px]">

                        <h2 className="px-1 py-2 text-white font-bold text-xl cursor-pointer">Log in</h2>
                    </div>
                </Link>
            </div>
        </>
    )
}

export default Header