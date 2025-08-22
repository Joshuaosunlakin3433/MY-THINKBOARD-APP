import { Routes, Route } from "react-router";
import { AuthProvider } from "./contexts/AuthContext";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import NoteDetailPage from "./pages/NoteDetailPage";
import Footer from "./components/Footer";
import Signup from "./components/Signup";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
// Removed: import Navbar from "./components/NavBar"; (not needed here anymore)

const App = () => {
  return (
    <div className="min-h-screen flex flex-col bg-black">
      {/* Background container - stays behind everything */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />
        <div className="animate-pulse transition ease-in-out absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full blur-3xl bg-[radial-gradient(circle_400px_at_50%_300px,#fbfbfb36,#000)]" />
      </div>

      {/* Main content area with proper z-index */}
      <div className="flex-1 relative z-10 px-5 sm:px-10">
        <AuthProvider>
          <Routes>
            {/* Public routes - no authentication required */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Protected routes - authentication required */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/create"
              element={
                <ProtectedRoute>
                  <CreatePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/note/:id"
              element={
                <ProtectedRoute>
                  <NoteDetailPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </AuthProvider>
      </div>

      {/* Footer - will stick to bottom naturally */}
      <Footer />
    </div>
  );
};

export default App;
