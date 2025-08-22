import { Link, useNavigate } from "react-router";
import { PlusIcon, LogOut, UserIcon } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";

const NavBar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setLoading(true);
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Failed to logout:", error);
    }
    setLoading(false);
  };

  // Get user's name from email (before @ symbol)
  const getUserName = (email) => {
    if (!email) return "User";
    return email.split("@")[0];
  };

  return (
    <div className="relative navbar container z-10">
      <div className="navbar-start">
        <Link to="/" className="btn btn-ghost text-base sm:text-xl font-bold">
          ThinkBoard
        </Link>
        
        {/* Mobile user avatar - shows first letter only */}
        {user && (
          <div className="ml-3 sm:hidden">
            <div className="w-8 h-8 bg-transparent border border-accent rounded-full flex items-center justify-center">
              <span className="text-primary-content text-sm font-bold">
                {getUserName(user.email).charAt(0).toUpperCase()}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Desktop greeting - shows in center on larger screens */}
      <div className="navbar-center hidden sm:flex">
        {user && (
          <span className="text-sm text-gray-300">
            Hi,{" "}
            <span className="text-white font-medium">
              {getUserName(user.email)}
            </span>
            !
          </span>
        )}
      </div>

      <div className="navbar-end flex items-center gap-1 sm:gap-2">
        {/* New Note Button */}
        <Link 
          to="/create" 
          className="btn btn-primary btn-sm sm:btn-md"
          title="Create new note"
        >
          <PlusIcon className="size-4 sm:size-5" />
          <span className="hidden sm:inline">New Note</span>
        </Link>

        {/* Logout Button */}
        {user && (
          <button
            onClick={handleLogout}
            disabled={loading}
            className="btn btn-ghost btn-sm sm:btn-md text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
            title="Logout"
          >
            <LogOut className="size-4 sm:size-5" />
            <span className="hidden sm:inline">
              {loading ? "Logging out..." : "Logout"}
            </span>
          </button>
        )}
      </div>
    </div>
  );
};

export default NavBar