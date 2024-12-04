
import {Navigate, Outlet} from "react-router-dom"
const PrivateComponent = ({children})=>{
    const isAuthenticated = true

    // return isAuthenticated ?children : <Navigate to="/login" replace/>
    // return isAuthenticated ? children : <Navigate to="/login" replace />;
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;

}
export default PrivateComponent