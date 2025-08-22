import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";
import NavBar from "./NavBar";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  // Show loading while Firebase checks authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  // If no user, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If user exists, show navbar + the protected component
  return (
    <>
      <NavBar />
      {children}
    </>
  );
};

export default ProtectedRoute;
