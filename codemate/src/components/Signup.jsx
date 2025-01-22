import React from 'react'
import {Link, useNavigate} from "react-router-dom"
import { useState, useEffect } from 'react'
import {useDispatch, useSelector} from "react-redux"
import { signup } from '../store/signupSlice'
import {toast} from "react-toastify"
import Loader from './Loader'
import { STATUSES } from '../store/signupSlice'
import { myProfile } from '../store/userProfileSlice'

const Signup = () => {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    // const [contact, setContact] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {user, status,isAuthenticated,resError} = useSelector((state)=>state.signupUser)

    useEffect(()=>{
        if(resError && user?.status=="failed"){
            toast.error(user.message,{
                position:"top-right",
                autoClose:5000,
                hideProgressBar:false,
                closeOnClick:true,
                pauseOnHover:true,
                draggable:true,
                theme:"colored",
                toastClassName:"Toastify__toast--error",
                progressStyle: {
                    background: "red", 
                  },
            })
        }
        if(isAuthenticated && user?.status==="success"){

            dispatch(myProfile())
            navigate("/create/profile")
        }

    }, [dispatch,resError,user?.status,isAuthenticated])

    if(status===STATUSES.LOADING){
        return(
            <Loader/>
        )
    }
    return (
        <>
            <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-gray-900 via-gray-800 to-black mb-10">
                <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8 fade-in">
                    <h2 className="text-3xl font-bold text-center text-purple-700 mb-3">Welcome to Codemate!</h2>
                    <p className="text-center text-pink-500 mb-3 font-semibold">Join and start building meaningful connections.</p>

                    <form onSubmit={(e)=>{
                        e.preventDefault()
                        // console.log(firstName, lastName, contact, email, password, 'formData')
                        dispatch(signup(firstName, lastName,email,password))

                    }}>
                        <div className="mb-3">
                            <label htmlFor="firstName" className="block text-gray-700 font-medium mb-2">
                                First Name
                            </label>
                            <input
                                id="firstName"
                                type="text"
                                placeholder="Enter your First name"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                onChange={(e)=>{setFirstName(e.target.value)}}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="LastName" className="block text-gray-700 font-medium mb-2">
                                Last Name
                            </label>
                            <input
                                id="LastName"
                                type="text"
                                placeholder="Enter your Last name"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                onChange={(e)=>{setLastName(e.target.value)}}
                            />
                        </div>

                        {/* <div className="mb-3">
                            <label htmlFor="contact" className="block text-gray-700 font-medium mb-2">
                                Contact
                            </label>
                            <input
                                id="contact"
                                type="text"
                                placeholder="Enter your phone no."
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                onChange={(e)=>{setContact(e.target.value)}}
                            />
                        </div> */}
                        <div className="mb-3">
                            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                onChange={(e)=>{setEmail(e.target.value)}}
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                onChange={(e)=>{setPassword(e.target.value)}}
                            />
                        </div>



                    

                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-orange-600 to-pink-600 text-white py-2 rounded-full hover:scale-105 transform transition duration-300"
                        >
                            Sign In
                        </button>
                    </form>

                    <div className="text-center mt-3">
                        <p className="text-gray-600">
                            Have an account?{' '}
                            <Link to="/login" className="text-indigo-600 font-medium hover:underline">
                                Login
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Signup