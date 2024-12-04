import "./App.css";
import Header from "./components/Header";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import LoginPage from "./components/Login";
import LandingPage from "./components/LandingPage";
import ErrorPage from "./components/ErrorPage";
import Signup from "./components/Signup";
import Body from "./components/Body";
import Sidebar from "./components/Sidebar";


const Layout = () => {
  const isAuthenticated = false
  return (
    <>
      <Header />
      <div className="flex">
      {/* Sidebar */}
      {
        isAuthenticated &&<Sidebar />
      }
      
      {/* Main Content */}
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
    </>
  );
};
function App() {

  const router = createBrowserRouter([
    {
      path:'/',
      element:<Layout/>,
      children:[
        {
          path:'/',
          element:<LandingPage/>
        },
        {
          path:"/login",
          element:<LoginPage/>
        },
        {
          path:"/signup",
          element:<Signup/>

        },
        {
          path:"/homepage",
          element:<Body/>

        },
        {
          path:"*",
          element:<ErrorPage/>
        }
      ]
    }
  ])
  return (
    <>
    <RouterProvider router={router}/>
    
    </>
  );
}

export default App;
