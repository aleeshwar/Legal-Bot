import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import logoDark from "../assets/logo-dark.png";
import { LogOut, Menu } from "lucide-react";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  // { name: "Contact Us", path: "/contact" }
];

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Check if the user is logged in by localStorage
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/signin");  // Redirects to the sign-in page
  };

  return (
    <nav className={`fixed w-full z-50 backdrop-blur-lg transition-all duration-300 ${
      scrolled ? 'bg-black/90 border-b border-white/10 shadow-lg py-2' : 'bg-black/50 py-4'
    }`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6">
        {/* Logo with enhanced styling - updated to grayscale theme */}
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-br from-gray-500/70 to-gray-800/70 rounded-full opacity-70 group-hover:opacity-100 blur group-hover:blur-md transition-all duration-300"></div>
            <div className="relative">
              <img
                src={logoDark}
                alt="Vidhik AI Logo"
                className="h-10 w-10 object-contain rounded-full "
              />
            </div>
          </div>
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-200 to-white hidden sm:inline">Vidhik AI</span>
        </Link>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6 text-gray-300" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-1 md:space-x-2">
          {navLinks.map((link) => (
            <motion.div
              key={link.name}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <Link
                to={link.path}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 hover:bg-white/10 ${
                  location.pathname === link.path 
                    ? "text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-white border-b-2 border-gray-400" 
                    : "text-gray-300 hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            </motion.div>
          ))}

          {/* Only show Chat when logged in */}
          {isLoggedIn && (
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <Link
                to="/query"
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 hover:bg-white/10 ${
                  location.pathname === "/query" 
                    ? "text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-white border-b-2 border-gray-400" 
                    : "text-gray-300 hover:text-white"
                }`}
              >
                Chat
              </Link>
            </motion.div>
          )}

          {/* Sign In / Log Out buttons with matching gradient styling */}
          {!isLoggedIn ? (
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <Link
                to="/signin"
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 hover:bg-white/10 ${
                  location.pathname === "/signin" 
                    ? "text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-white border-b-2 border-gray-400" 
                    : "text-gray-300 hover:text-white"
                }`}
              >
                Sign In
              </Link>
            </motion.div>
          ) : (
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block ml-2"
            >
              <button
                onClick={handleLogout}
                className="ml-1 p-2 rounded-lg text-gray-400 hover:text-red-400 transition-all"
                aria-label="Log Out"
                title="Log Out"
              >
                <span className="flex items-center justify-center">
                  <LogOut className="h-5 w-5 text-gray-200 hover:text-red-400 transition-all" />
                </span>
              </button>
            </motion.div>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/95 backdrop-blur-lg border-b border-white/10"
          >
            <div className="flex flex-col px-4 py-2 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200 hover:bg-white/10 ${
                    location.pathname === link.path 
                      ? "text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-white border-l-2 border-gray-400 pl-4" 
                      : "text-gray-300 hover:text-white"
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              
              {/* Only show Chat in mobile menu when logged in */}
              {isLoggedIn && (
                <Link
                  to="/query"
                  className={`px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200 hover:bg-white/10 ${
                    location.pathname === "/query" 
                      ? "text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-white border-l-2 border-gray-400 pl-4" 
                      : "text-gray-300 hover:text-white"
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  Chat
                </Link>
              )}
              
              {!isLoggedIn ? (
                <Link
                  to="/signin"
                  className="relative bg-gradient-to-r from-gray-600/40 to-gray-500/40 text-white px-4 py-3 rounded-xl border border-white/10 hover:border-white/30 shadow-lg transition-all group overflow-hidden"
                  onClick={() => setMenuOpen(false)}
                >
                  <span className="flex items-center justify-center relative z-10">
                    Sign In
                  </span>
                  <span className="absolute inset-0 bg-black/50 backdrop-blur-sm"></span>
                  <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
                </Link>
              ) : (
                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="relative bg-gradient-to-r from-gray-600/40 to-gray-500/40 text-white px-4 py-3 rounded-xl border border-white/10 hover:border-white/30 shadow-lg transition-all group overflow-hidden text-left w-full"
                >
                  <span className="flex items-center relative z-10">
                    <LogOut className="h-5 w-5 mr-2" />
                    <span>Log Out</span>
                  </span>
                  <span className="absolute inset-0 bg-black/50 backdrop-blur-sm"></span>
                  <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}