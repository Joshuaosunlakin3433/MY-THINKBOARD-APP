import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import { auth } from "../config/firebase";

// Create the context
const AuthContext = createContext();

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

// AuthProvider component that wraps my app
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authReady, setAuthReady] = useState(false); // 🆕 New: Track if auth is ready

  // Signup function
  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Login function
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Logout function
  const logout = () => {
    return signOut(auth);
  };

  // Listen for authentication state management
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
      setAuthReady(true); // 🆕 Auth system is now ready
      
      if (user) {
        console.log("🎉 User logged in:", user.email);
      } else {
        console.log("👤 No user logged in");
      }
    });

    // cleanup subscription on unmount
    return unsubscribe;
  }, []);

  // 🆕 Helper function to get current user's token
  const getAuthToken = async () => {
    if (!user) return null;
    try {
      return await user.getIdToken();
    } catch (error) {
      console.error("Error getting auth token:", error);
      return null;
    }
  };

  // value object that will be provided to components
  const value = {
    user,
    signup,
    login,
    logout,
    loading,
    authReady, // 🆕 Let components know when auth is ready
    getAuthToken, // 🆕 Helper function for getting tokens
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};