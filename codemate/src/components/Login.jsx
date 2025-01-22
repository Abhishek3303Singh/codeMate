import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { login } from '../store/signupSlice';
import { useEffect } from 'react';
import { myProfile } from '../store/userProfileSlice';
import { toast } from "react-toastify"
import { useSelector } from 'react-redux';
import { useRef } from 'react';

const LoginPage = () => {
  const { isAuthenticated, status, user, resError } = useSelector((state) => state.signupUser)
  const { resErr, isCreated } = useSelector((state) => state.profileData)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isTostShown = useRef(false)
  useEffect(() => {
    if (isAuthenticated && status === "success") {
      dispatch(myProfile())

      navigate("/feed")

    }
    else if (!isTostShown.current && resError && user?.status == "failed") {
      // console.log(user, 'user-login')
      toast.error(user.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        toastClassName: "Toastify__toast--error",
        progressStyle: {
          background: "red",
        },
      })
      isTostShown.current = true

      // cleanup to reset flag

      return () => {
        isTostShown.current = false
      }
    }

  }, [resError, isAuthenticated, user])



  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8 fade-in">
        <h2 className="text-3xl font-bold text-center text-purple-700 mb-4">Welcome Back!</h2>
        <p className="text-center text-pink-500 mb-6 font-semibold">Log in to continue your journey on Codemate.</p>

        <form onSubmit={(e) => {
          e.preventDefault()
          dispatch(login(email, password))
        }}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              onChange={(e) => { setEmail(e.target.value) }}
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              onChange={(e) => { setPassword(e.target.value) }}
            />
          </div>

          <div className="flex items-center justify-between mb-4">
            <label className="flex items-center">
              <input type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
              <span className="ml-2 text-gray-600">Remember me</span>
            </label>
            <Link to="#" className="text-indigo-600 hover:underline">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-orange-600 to-pink-600 text-white py-2 rounded-full hover:scale-105 transform transition duration-300"
          >
            Log In
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="text-indigo-600 font-medium hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
