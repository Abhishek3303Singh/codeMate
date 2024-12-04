import React from 'react'
import { Link } from 'react-router-dom'

const
    LandingPage = () => {
        return (
            <>
                <div
                    className="min-h-screen bg-codemate flex flex-col justify-center items-center bg-gradient-to-b from-black/50 to-black/0
"
                >
                    <h1
                        className="text-amber-50 text-7xl font-bold text-center
  drop-shadow-xl tracking-wide text-shadow-glow"
                    >
                        Build connections that matter.
                    </h1>
                    <Link to="/signup">
                    <h1
                        className="text-white text-2xl mt-8 border-red-500 py-3 rounded-full px-5 font-extrabold
  bg-gradient-to-r from-orange-600 via-purple-500 to-pink-500 ... cursor-pointer
  transform transition-transform duration-300 ease-in-out hover:scale-110

  "
                    >
                        Create account
                    </h1>
                    </Link>
                </div>
            </>
        )
    }

export default LandingPage
