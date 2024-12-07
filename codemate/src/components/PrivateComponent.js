import { useSelector } from "react-redux";
import {Navigate, Outlet} from "react-router-dom"
import Loader from "./Loader";
import { STATUSES } from "../store/signupSlice";
const PrivateComponent = ({children})=>{
//  const {isAuthenticated ,status} = useSelector((state)=>state.signupUser)
const isAuthenticated = true
//  if(status===STATUSES.LOADING){
//     return <Loader/>
//  }

    // return isAuthenticated ?children : <Navigate to="/login" replace/>
    // return isAuthenticated ? children : <Navigate to="/login" replace />;
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;

}
export default PrivateComponent