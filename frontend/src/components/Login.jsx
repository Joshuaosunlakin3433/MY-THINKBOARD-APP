import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  // Form state - only email and password for login
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Get login function from AuthContext
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);

      // Call the login function from AuthContext
      await login(email, password);

      // If successful, navigate to main app
      navigate("/");
    } catch (error) {
      // Firebase-specific error messages
      let errorMessage = "Failed to sign in";

      if (error.code === "auth/user-not-found") {
        errorMessage = "No account found with this email";
      } else if (error.code === "auth/wrong-password") {
        errorMessage = "Incorrect password";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "Invalid email address";
      } else if (error.code === "auth/too-many-requests") {
        errorMessage = "Too many failed attempts. Try again later.";
      }

      setError(errorMessage);
    }

    setLoading(false);
  };

  return (
    <div className="relative min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-screen">
          <div className="card bg-base-100 shadow-2xl border border-base-200 w-full max-w-md">
            <div className="card-body p-8">
              <h2 className="text-2xl font-bold text-base-content mb-6 text-center">
                Sign In to ThinkBoard
              </h2>

              {/* Error message display */}
              {error && (
                <div className="alert alert-error mb-4">
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email input */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Email</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input input-bordered input-lg w-full focus:input-primary focus:outline-none transition-all duration-200"
                    required
                    disabled={loading}
                    placeholder="Enter your email"
                  />
                </div>

                {/* Password input */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Password</span>
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input input-bordered input-lg w-full focus:input-primary focus:outline-none transition-all duration-200"
                    required
                    disabled={loading}
                    placeholder="Enter your password"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary btn-lg w-full mt-6"
                >
                  {loading ? (
                    <>
                      <span className="loading loading-spinner loading-sm"></span>
                      Signing In...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </button>
              </form>

              {/* Link to signup */}
              <p className="text-base-content/60 text-center mt-6">
                Don't have an account?{" "}
                <Link to="/signup" className="link link-primary font-medium">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
