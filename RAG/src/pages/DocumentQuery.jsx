import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import PageWrapper from "../components/PageWrapper";
import Navbar from "../components/Navbar";

const API_BASE = "https://7539-34-125-169-233.ngrok-free.app"; // Replace with your actual ngrok URL

export default function ChatWithDocs() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [file, setFile] = useState(null);
  const [uploadedFilename, setUploadedFilename] = useState("");
  const [isBackendRunning, setIsBackendRunning] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const checkBackendStatus = async () => {
      try {
        await axios.get(`${API_BASE}/health`);
        setIsBackendRunning(true);
      } catch (error) {
        setIsBackendRunning(false);
      }
    };

    checkBackendStatus();
    // Check status every 30 seconds
    const interval = setInterval(checkBackendStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleUpload = async () => {
    if (!file) return;
    
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post(`${API_BASE}/upload`, formData);
      setUploadedFilename(res.data.filename);
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const askUploaded = async () => {
    if (!question.trim() || !uploadedFilename) return;
    
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("prompt", question);
      formData.append("filename", uploadedFilename);
      const res = await axios.post(`${API_BASE}/chat-upload`, formData);
      setAnswer(res.data.answer);
    } catch (error) {
      setAnswer("An error occurred while processing your request.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageWrapper>
      <div className="min-h-screen bg-black text-white">
        <Navbar />

        {/* Enhanced background with subtle animation - changed to grayscale theme */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/30 via-gray-800/20 to-black/30 blur-3xl opacity-30">
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
        <div className="relative z-10 max-w-5xl mx-auto pt-24 pb-16 px-6">
          {/* Badge */}
          <div className="inline-block px-4 py-1 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-gray-300 text-sm font-medium mb-6">
            AI-Powered Document Analysis
          </div>

          <h1 className="text-5xl sm:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-300">
            Chat With Your Documents
          </h1>

          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Upload documents and get AI-powered insights and answers to your specific queries.
          </p>

          <div className="flex items-center gap-2 mb-8">
            <div className={`w-3 h-3 rounded-full ${isBackendRunning ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span className="text-sm text-gray-300">
              {isBackendRunning ? 'Backend Connected' : 'Backend Disconnected'}
            </span>
          </div>

          {/* Main content area */}
          <div className="grid md:grid-cols-1 gap-8">
            <motion.div 
              className="bg-gradient-to-br from-white/5 to-white/10 p-8 rounded-2xl backdrop-blur-lg border border-white/10 shadow-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Upload section */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-200 to-white">
                  Upload Your Document
                </h2>
                
                <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-4">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <input
                      type="file"
                      onChange={(e) => setFile(e.target.files[0])}
                      className="bg-white/5 border border-white/20 text-white rounded-lg p-2 w-full"
                    />
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleUpload}
                      disabled={!file || !isBackendRunning || isLoading}
                      className={`bg-gradient-to-r from-gray-600/40 to-gray-500/40 text-white font-semibold px-6 py-2 rounded-xl backdrop-blur-md border border-white/20 hover:border-white/30 shadow-lg transition-all ${(!file || !isBackendRunning || isLoading) ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      {isLoading ? 'Uploading...' : 'Upload Document'}
                    </motion.button>
                  </div>
                  
                  {uploadedFilename && (
                    <div className="mt-4 p-3 bg-gray-500/20 border border-gray-500/30 rounded-lg text-gray-300">
                      <p className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        File uploaded: {uploadedFilename}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Question section */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-200 to-white">
                  Ask Your Question
                </h2>
                
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="What would you like to know about the document?"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    className="w-full bg-white/5 border border-white/20 text-white rounded-lg p-3 mb-4"
                  />
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={askUploaded}
                    disabled={!uploadedFilename || !isBackendRunning || !question.trim() || isLoading}
                    className={`w-full bg-gradient-to-r from-gray-600/40 to-gray-500/40 text-white font-semibold px-6 py-3 rounded-xl backdrop-blur-md border border-white/20 hover:border-white/30 shadow-lg transition-all ${(!uploadedFilename || !isBackendRunning || !question.trim() || isLoading) ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {isLoading ? 'Processing...' : 'Ask About Document'}
                  </motion.button>
                </div>
              </div>
              
              {/* Answer section */}
              {answer && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-200 to-white">
                    AI Response
                  </h2>
                  
                  <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-xl shadow-lg overflow-hidden">
                    <div className="p-6">
                      <div className="prose prose-invert max-w-none">
                        <p className="whitespace-pre-wrap text-gray-200">{answer}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
        
        {/* Bottom decoration */}
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black to-transparent pointer-events-none" />
        
        {/* Add keyframes for floating particles */}
        <style jsx>{`
          @keyframes float {
            0% { transform: translateY(0) translateX(0); opacity: 0; }
            10% { opacity: 0.8; }
            90% { opacity: 0.8; }
            100% { transform: translateY(-1000px) translateX(100px); opacity: 0; }
          }
        `}</style>
      </div>
    </PageWrapper>
  );
}