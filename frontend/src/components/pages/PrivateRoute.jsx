import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem( "token"); // ✅ Check if user is logged in

  return token ? children : <Navigate to="/login" replace />; // ✅ Redirect if not logged in
};

export default PrivateRoute;
