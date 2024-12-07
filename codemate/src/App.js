import "./App.css";
import Header from "./components/Header";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
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
const Layout = () => {
  const isAuthenticated = true;
  return (
    <>
      <Header />
      <div className="grid grid-flow-col grid-cols-[0.5fr_2fr] h-screen">
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
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <LandingPage />,
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
