import { Navigate, Outlet } from "react-router-dom";
import { useFirebase } from "../context/Firebase";

const ProtectedRoute = () => {
  const firebase = useFirebase();

  if (!firebase.isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
