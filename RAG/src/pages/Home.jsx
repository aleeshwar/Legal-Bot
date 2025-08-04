import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import Navbar from "../components/Navbar";
import PageWrapper from "../components/PageWrapper";

const Chat = () => {
  const navigate = useNavigate();
  const [activeCard, setActiveCard] = useState(null);

  // Safely retrieve the login status from localStorage
  const isLoggedIn = typeof window !== "undefined" ? localStorage.getItem("isLoggedIn") : null;

  const handleStartChat = () => {
    if (isLoggedIn === "true") {
      navigate("/query");
    } else {
      navigate("/signin");
    }
  };

  const handleDocumentAnalysis = () => {
    if (isLoggedIn === "true") {
      navigate("/document-query");
    } else {
      navigate("/signin");
    }
  };

  return (
    <PageWrapper>
      <div className="min-h-screen bg-black text-white">
        <Navbar />

        {/* Added pt-24 to create space below navbar */}
        <div className="relative w-full pt-24 pb-16 px-6 text-center overflow-hidden">
          {/* Enhanced background with subtle animation - changed to whitish grey */}
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

          {/* Foreground Content */}
          <div className="relative z-10 max-w-5xl mx-auto">
            {/* Badge */}
            <div className="inline-block px-4 py-1 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-gray-300 text-sm font-medium mb-6">
              AI-Powered Legal Assistant
            </div>
            
            {/* Added min-height to ensure the typewriter has space */}
            <h1 className="text-5xl sm:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-300 min-h-[72px]">
              <Typewriter
                words={[
                  "Ask Legal Questions",
                  "Instant Law Help",
                  "Your Legal Bot",
                ]}
                loop={true}
                cursor
                cursorStyle="_"
                typeSpeed={60}
                deleteSpeed={40}
                delaySpeed={1200}
              />
            </h1>

            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Get instant, AI-powered answers to your legal questions and document analysis.
            </p>
            
          

            <div className="grid md:grid-cols-2 gap-8 mt-8">
              {/* Chat Bot Option */}
              <motion.div 
                className="bg-gradient-to-br from-white/5 to-white/10 p-8 rounded-2xl backdrop-blur-lg border border-white/10 shadow-xl group"
                whileHover={{ scale: 1.02 }}
                onHoverStart={() => setActiveCard('chat')}
                onHoverEnd={() => setActiveCard(null)}
              >
                {/* Highlight effect - changed to whitish grey */}
                <div className="absolute inset-0 bg-gradient-to-r from-gray-500/0 via-gray-500/10 to-gray-500/0 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative">
                  <div className="h-20 w-20 rounded-full bg-gradient-to-br from-gray-400/20 to-gray-500/20 flex items-center justify-center mx-auto mb-6 border border-white/20 shadow-lg group-hover:shadow-gray-500/10 transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                  </div>
                  
                  <h2 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-200 to-white">
                    AI Legal Assistant
                  </h2>
                  
                  <p className="text-gray-300 mb-8 text-lg">
                    Engage with our AI-powered legal assistant for immediate answers to your legal questions and personalized guidance.
                  </p>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleStartChat}
                    className="w-full bg-gradient-to-r from-gray-600/40 to-gray-500/40 text-white font-semibold px-6 py-4 rounded-xl backdrop-blur-md border border-white/20 hover:border-white/30 shadow-lg transition-all group overflow-hidden"
                  >
                    <span className="flex items-center justify-center gap-2">
                      Start Chatting
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
                  </motion.button>
                </div>
              </motion.div>

              {/* Document Analysis Option */}
              <motion.div 
                className="bg-gradient-to-br from-white/5 to-white/10 p-8 rounded-2xl backdrop-blur-lg border border-white/10 shadow-xl group"
                whileHover={{ scale: 1.02 }}
                onHoverStart={() => setActiveCard('document')}
                onHoverEnd={() => setActiveCard(null)}
              >
                {/* Highlight effect - changed to whitish grey */}
                <div className="absolute inset-0 bg-gradient-to-r from-gray-500/0 via-gray-500/10 to-gray-500/0 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative">
                  <div className="h-20 w-20 rounded-full bg-gradient-to-br from-gray-400/20 to-gray-500/20 flex items-center justify-center mx-auto mb-6 border border-white/20 shadow-lg group-hover:shadow-gray-500/10 transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                  
                  <h2 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-200 to-white">
                    Document Analysis
                  </h2>
                  
                  <p className="text-gray-300 mb-8 text-lg">
                    Upload legal documents and get AI-powered insights and detailed answers to your specific document queries.
                  </p>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleDocumentAnalysis}
                    className="w-full bg-gradient-to-r from-gray-600/40 to-gray-500/40 text-white font-semibold px-6 py-4 rounded-xl backdrop-blur-md border border-white/20 hover:border-white/30 shadow-lg transition-all group overflow-hidden"
                  >
                    <span className="flex items-center justify-center gap-2">
                      Upload Document
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </div>
          
          {/* Bottom decoration */}
          <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-gray-900 to-transparent pointer-events-none" />
        </div>
        
        {/* Simple footer */}
        {/* <div className="relative text-center py-6 text-gray-500 text-sm border-t border-white/5"> */}
          {/* <p>Powered by AI Legal Assistant • © {new Date().getFullYear()}</p> */}
        {/* </div> */}
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

export default Chat;