import React, { useState, useEffect, useRef } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { motion, AnimatePresence } from "framer-motion";
import { Send, User, Bot, Sparkles, Trash2, Plus, Loader, Mic, MicOff } from "lucide-react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import PageWrapper from "../components/PageWrapper";
import TypeWriter from "../components/TypeWriter";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Array of random legal questions to suggest to users
const randomLegalQuestions = [
  "What is the process to file an appeal in a criminal case?",
  "How does arbitration differ from litigation in contract disputes?",
  "Can a landlord legally evict a tenant without a court hearing?",
  "What compensation is available for workmen’s compensation claims?",
  "How does intellectual property law protect a registered trademark?",
  "What are the penalties for a felony conviction in Indian law?",
  "How can I claim damages for breach of contract?",
  "Is there a statute that governs discrimination in the workplace?",
  "What is the procedure for filing for bankruptcy under Indian law?",
  "When is a subpoena issued during a civil trial?",
  "What are the rights of a defendant during arraignment?",
  "Can a foreign national apply for a visa after an indictment?",
  "What is considered harassment under Indian criminal law?",
  "How is a precedent established in a constitutional ruling?",
  "What kind of insurance is required for property lease agreements?"
];

const Query = () => {
  const [input, setInput] = useState("");
  const [chatSessions, setChatSessions] = useState([]);
  const [currentSessionIndex, setCurrentSessionIndex] = useState(-1);
  const [currentSession, setCurrentSession] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [suggestedQuestions, setSuggestedQuestions] = useState([]);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speechRecognition, setSpeechRecognition] = useState(null);
  const navigate = useNavigate();
  const chatEndRef = useRef(null);
  const [user, setUser] = useState(null);

  // Setup speech recognition
  useEffect(() => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0])
          .map(result => result.transcript)
          .join('');
        
        setInput(transcript);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
      };

      setSpeechRecognition(recognition);
    }
  }, []);

  // Toggle speech recognition
  const toggleListening = () => {
    if (isListening) {
      speechRecognition?.stop();
    } else {
      try {
        speechRecognition?.start();
      } catch (error) {
        console.error('Failed to start speech recognition:', error);
      }
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate("/signin");
    }
  }, [navigate]);

  useEffect(() => {
    if (user) {
      const storedSessions =
        JSON.parse(localStorage.getItem(`${user.email}_chatHistorySessions`)) || [];
      setChatSessions(storedSessions);
      if (currentSessionIndex !== -1 && storedSessions[currentSessionIndex]) {
        setCurrentSession(storedSessions[currentSessionIndex]);
      } else {
        setCurrentSession([]);
      }
    }
  }, [user, currentSessionIndex]);

  useEffect(() => {
    scrollToBottom();
  }, [currentSession]);

  // Generate 3 random unique questions when component mounts or new chat starts
  useEffect(() => {
    if (currentSession.length === 0) {
      getRandomQuestions();
    }
  }, [currentSession.length]);

  const getRandomQuestions = () => {
    const shuffled = [...randomLegalQuestions].sort(() => 0.5 - Math.random());
    setSuggestedQuestions(shuffled.slice(0, 3));
  };

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    
    // Stop speech recognition if it's active
    if (isListening) {
      speechRecognition?.stop();
    }
    
    const userMsg = { from: "user", text: input };
    const updatedSession = [...currentSession, userMsg];
    setCurrentSession(updatedSession);
    setInput("");
    setIsProcessing(true);
    
    try {
      const response = await axios.post("http://localhost:5000/api/query", {
        query: input,
        email: user.email,
      });
      const ragAnswer = response?.data?.response;
      const errorMsg = response?.data?.error;
      const botMsg = {
        from: "bot",
        text:
          typeof ragAnswer === "string"
            ? ragAnswer
            : `⚠ ${errorMsg || "Invalid response from RAG model"}`,
      };
      const fullSession = [...updatedSession, botMsg];
      setCurrentSession(fullSession);
      let updatedSessions;
      if (currentSessionIndex === -1) {
        updatedSessions = [...chatSessions, fullSession];
        setCurrentSessionIndex(updatedSessions.length - 1);
      } else {
        updatedSessions = [...chatSessions];
        updatedSessions[currentSessionIndex] = fullSession;
      }
      setChatSessions(updatedSessions);
      localStorage.setItem(
        `${user.email}_chatHistorySessions`,
        JSON.stringify(updatedSessions)
      );
    } catch (error) {
      console.error("❌ Error querying backend:", error);
      const botMsg = {
        from: "bot",
        text:
          error?.response?.data?.error ||
          error?.message ||
          "🚫 Failed to fetch response from backend.",
      };
      setCurrentSession([...updatedSession, botMsg]);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleDeleteAll = () => {
    setChatSessions([]);
    setCurrentSession([]);
    setCurrentSessionIndex(-1);
    if (user) {
      localStorage.removeItem(`${user.email}_chatHistorySessions`);
    }
    getRandomQuestions(); // Get new random questions when starting fresh
    setIsMobileSidebarOpen(false); // Close mobile sidebar after action
  };

  const handleNewChat = () => {
    setCurrentSession([]);
    setCurrentSessionIndex(-1);
    getRandomQuestions(); // Get new random questions when starting a new chat
    setIsMobileSidebarOpen(false); // Close mobile sidebar after action
  };

  const handleSelectSession = (index) => {
    setCurrentSessionIndex(index);
    setIsMobileSidebarOpen(false); // Close mobile sidebar after selection
  };

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  return (
    <PageWrapper>
      <div className="h-screen flex flex-col bg-black text-white overflow-hidden">
        <Navbar onToggleSidebar={toggleMobileSidebar} />
        <div className="flex flex-grow overflow-hidden relative pt-16"> {/* Added pt-16 for navbar spacing */}
          {/* Background effects - Updated to match homepage theme */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/30 via-purple-800/20 to-blue-900/30 blur-3xl opacity-30">
            <div className="absolute inset-0 animate-pulse" style={{animationDuration: '8s'}}></div>
          </div>
          
          {/* Subtle particle effects */}
          <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
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
          {/* Desktop Sidebar - Only visible on lg screens and up */}
          <div className="hidden lg:block relative z-20">
            <Sidebar
              chatSessions={chatSessions}
              onSelectSession={handleSelectSession}
              onDeleteAll={handleDeleteAll}
              onNewChat={handleNewChat}
              currentSessionIndex={currentSessionIndex}
            />
          </div>
          {/* Mobile Sidebar - Overlay with animation */}
          <AnimatePresence>
            {isMobileSidebarOpen && (
              <>
                {/* Backdrop */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="lg:hidden fixed inset-0 bg-black/70 z-30"
                  onClick={() => setIsMobileSidebarOpen(false)}
                />
                
                {/* Sliding sidebar */}
                <motion.div 
                  initial={{ x: "-100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "-100%" }}
                  transition={{ type: "spring", damping: 25, stiffness: 300 }}
                  className="lg:hidden fixed top-0 left-0 h-full z-40 w-72"
                >
                  <div className="h-full pt-16"> {/* Add top padding for navbar */}
                    <Sidebar
                      chatSessions={chatSessions}
                      onSelectSession={handleSelectSession}
                      onDeleteAll={handleDeleteAll}
                      onNewChat={handleNewChat}
                      currentSessionIndex={currentSessionIndex}
                    />
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
          <div className="flex flex-col flex-grow h-full z-10">
            {/* Empty state - Updated to match homepage theme */}
            {currentSession.length === 0 && (
              <div className="flex-grow flex items-center justify-center">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center max-w-md px-6"
                >
                  <div className="h-20 w-20 rounded-full bg-gradient-to-br from-gray-400/20 to-gray-500/20 flex items-center justify-center mx-auto mb-6 border border-white/20 shadow-lg">
                    <Sparkles className="h-8 w-8 text-gray-300" />
                  </div>
                  <h2 className="text-2xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-gray-200 to-white">
                    AI Legal Assistant
                  </h2>
                  <p className="text-gray-300 mb-8">
                    Ask any legal question and get accurate, AI-powered answers to help with your legal needs.
                  </p>
                  <div className="grid gap-4">
                    {suggestedQuestions.map((question, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setInput(question)}
                        className="p-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-left text-sm text-gray-300 hover:bg-white/10 transition-all"
                      >
                        {question}
                      </motion.button>
                    ))}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={getRandomQuestions}
                      className="p-2 mt-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-center text-xs text-gray-300 hover:bg-white/10 transition-all"
                    >
                      Show different questions
                    </motion.button>
                  </div>
                </motion.div>
              </div>
            )}
            {/* Chat messages - Updated to match homepage theme */}
            {currentSession.length > 0 && (
              <div className="flex-grow overflow-y-auto px-6 py-6 space-y-6 max-w-3xl mx-auto w-full scrollbar-thin scrollbar-thumb-gray-800">
                <AnimatePresence initial={false}>
                  {currentSession.map((msg, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className={`flex items-start gap-3 ${
                        msg.from === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      {msg.from === "bot" && (
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-400/20 to-gray-500/20 flex items-center justify-center border border-white/10 shadow-md">
                          <Bot size={20} className="text-gray-300" />
                        </div>
                      )}
                      <div
                        className={`max-w-[75%] px-5 py-3 rounded-2xl backdrop-blur-sm shadow-md text-sm transition-all duration-200
                          ${
                            msg.from === "user"
                              ? "bg-gradient-to-r from-gray-600/40 to-gray-500/40 text-white rounded-br-none border border-white/10"
                              : "bg-gradient-to-r from-gray-600/30 to-gray-500/30 text-white rounded-bl-none border border-white/10"
                          }
                        `}
                      >
                        {msg.from === "bot" && i === currentSession.length - 1 ? (
                          <TypeWriter text={msg.text} />
                        ) : (
                          <div className="whitespace-pre-wrap">{msg.text}</div>
                        )}
                      </div>
                      {msg.from === "user" && (
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-400/20 to-gray-500/20 flex items-center justify-center border border-white/10 shadow-md">
                          <User size={20} className="text-gray-300" />
                        </div>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
                {/* Loading indicator - Updated to match homepage theme */}
                {isProcessing && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-start gap-3 justify-start"
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-400/20 to-gray-500/20 flex items-center justify-center border border-white/10 shadow-md">
                      <Bot size={20} className="text-gray-300" />
                    </div>
                    <div className="max-w-[75%] px-5 py-4 rounded-2xl backdrop-blur-sm shadow-md text-sm bg-gradient-to-r from-gray-600/30 to-gray-500/30 text-white rounded-bl-none border border-white/10">
                      <div className="flex items-center gap-3">
                        <div className="animate-spin">
                          <Loader size={16} className="text-gray-300" />
                        </div>
                        <div className="text-gray-300">Thinking...</div>
                      </div>
                    </div>
                  </motion.div>
                )}
                
                <div ref={chatEndRef} />
              </div>
            )}
            {/* Chat input - Updated with microphone button */}
            <div className="px-4 py-4 bg-gradient-to-r from-black/90 via-gray-900/80 to-black/90 border-t border-white/5">
              <div className="relative max-w-3xl mx-auto">
                <TextareaAutosize
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your legal query or click the mic to speak..."
                  className="w-full p-4 pr-24 text-sm text-white bg-white/5 backdrop-blur-md border border-white/10 rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-gray-500/50 resize-none transition-all duration-200"
                  minRows={1}
                  maxRows={6}
                  disabled={isProcessing}
                />
                
                {/* Microphone button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleListening}
                  disabled={isProcessing || !speechRecognition}
                  className={`absolute right-14 bottom-3 p-2 rounded-lg ${
                    !isProcessing && speechRecognition
                      ? isListening 
                        ? "bg-red-500/80 text-white border border-white/20 animate-pulse" 
                        : "bg-gradient-to-r from-gray-600/40 to-gray-500/40 text-white border border-white/20"
                      : "bg-white/5 text-gray-500"
                  } transition-all`}
                >
                  {isListening ? (
                    <MicOff size={18} />
                  ) : (
                    <Mic size={18} />
                  )}
                </motion.button>
                
                {/* Send button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSend}
                  disabled={isProcessing || !input.trim()}
                  className={`absolute right-3 bottom-3 p-2 rounded-lg ${
                    input.trim() && !isProcessing 
                      ? "bg-gradient-to-r from-gray-600/40 to-gray-500/40 text-white border border-white/20" 
                      : "bg-white/5 text-gray-500"
                  } transition-all`}
                >
                  {isProcessing ? (
                    <Loader size={18} className="animate-spin" />
                  ) : (
                    <Send size={18} />
                  )}
                </motion.button>
              </div>
              
              {/* Speech recognition status indicator */}
              {isListening && (
                <div className="text-center mt-2 text-xs text-red-400 animate-pulse">
                  Listening... Speak your legal question
                </div>
              )}
              
              {/* Browser compatibility notice */}
              {!speechRecognition && (
                <div className="text-center mt-2 text-xs text-gray-400">
                  Voice input not supported in your browser. Try Chrome or Edge.
                </div>
              )}
            </div>
            {/* Action buttons for mobile - Updated to match homepage theme */}
            <div className="lg:hidden flex justify-center gap-4 py-2 bg-black/80 border-t border-white/5">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleMobileSidebar}
                className="p-2 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10 hover:text-white transition-all"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h8m-8 6h16" />
                </svg>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNewChat}
                className="p-2 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10 hover:text-white transition-all"
              >
                <Plus size={18} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDeleteAll}
                className="p-2 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10 hover:text-red-400 transition-all"
              >
                <Trash2 size={18} />
              </motion.button>
            </div>
          </div>
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

export default Query;