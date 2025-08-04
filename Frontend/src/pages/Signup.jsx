import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import Navbar from "../components/Navbar"; // Added Navbar import
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";

const SignUp = () => {
  const navigate = useNavigate();

  // State for form input
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Handle Sign Up
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation for email
    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    // Validation for password (at least one special character)
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
    if (!specialCharRegex.test(password)) {
      setError("Password must contain at least one special character.");
      return;
    }

    // Check if password and confirm password match
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Get users from localStorage, or create an empty object if not available
    const users = JSON.parse(localStorage.getItem("users")) || {};

    // Check if email already exists
    if (users[email]) {
      setError("Account already exists.");
      return;
    }

    // Save the new user to localStorage (in users object)
    users[email] = { email, password };
    localStorage.setItem("users", JSON.stringify(users));

    // Redirect to Sign In page after successful sign up
    navigate("/signin");
  };

  return (
    <PageWrapper>
      <div className="min-h-screen bg-black text-white flex flex-col">
        {/* Navbar added at the top */}
        <Navbar />
        
        {/* Main content - with better positioning to avoid navbar overlap */}
        <div className="flex-1 flex items-center justify-center p-4 relative z-10 pt-24">
          {/* Enhanced background with subtle animation */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/30 via-purple-800/20 to-blue-900/30 blur-3xl opacity-30">
            <div className="absolute inset-0 animate-pulse" style={{animationDuration: '8s'}}></div>
          </div>
          
          {/* Subtle particle effects */}
          <div className="absolute inset-0 overflow-hidden opacity-20">
            {[...Array(15)].map((_, i) => (
              <div 
                key={i}
                className="absolute rounded-full bg-white/60"
                style={{
                  width: Math.random() * 4 + 1 + 'px',
                  height: Math.random() * 4 + 1 + 'px',
                  top: Math.random() * 100 + '%',
                  left: Math.random() * 100 + '%',
                  animation: `float ${Math.random() * 10 + 20}s linear infinite`
                }}
              />
            ))}
          </div>

          <motion.div 
            className="w-full max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Badge - Changed to match sign-in page */}
            <div className="flex justify-center mb-6">
              <div className="inline-block px-4 py-1 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-gray-300 text-sm font-medium">
                Create Account
              </div>
            </div>
            
            <h1 className="text-4xl font-bold mb-3 text-center leading-tight">
              <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-300 pb-[2px]">
                Sign Up
              </span>
            </h1>
            
            <p className="text-gray-300 mb-8 text-center max-w-sm mx-auto">
              Join our community to access your AI-powered legal assistant
            </p>

            <div className="bg-gradient-to-br from-white/5 to-white/10 rounded-2xl backdrop-blur-lg border border-white/10 shadow-xl overflow-hidden">
              <form onSubmit={handleSubmit} className="p-6">
                {/* Error Message */}
                {error && (
                  <motion.div 
                    className="bg-red-900/30 border border-red-500/30 text-red-300 px-4 py-3 rounded-lg mb-6 text-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {error}
                  </motion.div>
                )}

                {/* Email Input */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      className="w-full p-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500/50 text-white placeholder-gray-400"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="w-full p-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500/50 text-white placeholder-gray-400 pr-10"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Create password"
                      required
                    />
                    <button 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-gray-400 hover:text-gray-300"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  <p className="mt-1 text-xs text-gray-400">
                    Password must contain at least one special character
                  </p>
                </div>

                {/* Confirm Password Input */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      className="w-full p-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500/50 text-white placeholder-gray-400 pr-10"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm password"
                      required
                    />
                    <button 
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-3 text-gray-400 hover:text-gray-300"
                    >
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {/* Submit Button - Changed to match sign-in page */}
                <motion.button
                  type="submit"
                  className="w-full bg-gradient-to-r from-gray-600/40 to-gray-500/40 text-white font-semibold px-6 py-4 rounded-xl backdrop-blur-md border border-white/20 hover:border-white/30 shadow-lg transition-all group overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="flex items-center justify-center gap-2">
                    Create Account
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
                </motion.button>

                {/* Sign In Link - Changed text color to match theme */}
                <div className="mt-5 text-center">
                  <p className="text-gray-300 text-sm">
                    Already have an account?{" "}
                    <button 
                      onClick={() => navigate("/signin")}
                      className="text-gray-300 hover:text-white font-medium"
                      type="button"
                    >
                      Sign In
                    </button>
                  </p>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Add keyframes for floating particles */}
      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          10% { opacity: 0.8; }
          90% { opacity: 0.8; }
          100% { transform: translateY(-1000px) translateX(100px); opacity: 0; }
        }
      `}</style>
    </PageWrapper>
  );
};

export default SignUp;