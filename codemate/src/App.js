import "./App.css";
import Header from "./components/Header";
import { createBrowserRouter, Outlet, RouterProvider, Navigate } from "react-router-dom";
import LoginPage from "./components/Login";
import LandingPage from "./components/LandingPage";
import ErrorPage from "./components/ErrorPage";
import Signup from "./components/Signup";
import Body from "./components/Body";
import Sidebar from "./components/Sidebar";
import CreateProfile from "./components/CreateProfile";
import PrivateComponent from "./components/PrivateComponent";
import FeedCard from "./components/FeedCard";
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { getUser } from "./store/signupSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { STATUSES } from "./store/signupSlice";
import Loader from "./components/Loader";
import AllRequest from "./components/AllRequest";
import ConnectionsPage from "./components/ConnectionsPage";
import UpdateProfile from "./components/UpdateProfile";
import UserDetails from "./components/userDetails";
const Layout = () => {
  const {isAuthenticated ,status} = useSelector((state)=>state.signupUser)

  return (
    <>
      <Header />
      <div className={`${
          isAuthenticated
            ? "grid grid-flow-col grid-cols-[0.5fr_2fr]"
            : "grid grid-cols-1"
        } h-screen`}>
        <div className="sticky top-0">
          {/* Sidebar */}
          {isAuthenticated && <Sidebar />}
        </div>

        {/* Main Content */}
        <div className="overflow-y-auto">
          <Outlet />
        </div>
      </div>
      <ToastContainer/>
    </>
  );
};
function App() {
  const {isAuthenticated ,status} = useSelector((state)=>state.signupUser)
  const {resErr, isCreated } = useSelector((state) => state.profileData)
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getUser())
  },[])
  if(status===STATUSES.LOADING){
    return <Loader/>
  }

  

  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout/>,
      children: [
        {
          path: "/",
          element: !isAuthenticated 
          ? <LandingPage /> 
          : isCreated
            ? <FeedCard /> 
            : <Navigate to="/create/profile" replace />,
        },
        {
          path: "/login",
          element: <LoginPage />,
        },
        {
          path: "/signup",
          element: <Signup />,
        },
        // private Route
        {
          element: <PrivateComponent />,
          children: [
            {
              path: "/create/profile",
              element: <CreateProfile />,
            },
            {
              path: "/feed",
              element: <FeedCard />,
            },
            {
              path:"/all/request",
              element:<AllRequest/>
            },
            {
              path:"/my/match",
              element:<ConnectionsPage/>
            },
            {
              path:"/update/profile",
              element:<UpdateProfile/>
            },
            {
              path:"/profile/details",
              element:<UserDetails/>
            }
          ],
        },

        {
          path: "*",
          element: <ErrorPage />,
        },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
