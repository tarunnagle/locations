import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";


const PrivateRoute = () => {
  return (
    <div>
      const {currentUser} = useSelector((state) => state.user);
      return currentUser ? <Outlet /> : <Navigate to='/sign-in' />;
    </div>
  )
}

export default PrivateRoute
