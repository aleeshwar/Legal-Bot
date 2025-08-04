import React from "react";
import { PlusCircle, MessageSquare, Trash2 } from "lucide-react";
import { motion } from "framer-motion";

const Sidebar = ({
  chatSessions = [],
  onSelectSession,
  onDeleteAll,
  onNewChat,
  currentSessionIndex,
}) => {
  return (
    <div className="w-72 border-r border-white/5 bg-gradient-to-b from-black to-gray-900 flex flex-col h-full overflow-hidden">
      {/* Logo area */}
      <div className="px-4 py-6">
        <div className="flex items-center gap-2 mb-2">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-gray-400/20 to-gray-500/20 flex items-center justify-center border border-white/10 shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </div>
          <h1 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-200 to-white">
            Legal Assistant
          </h1>
        </div>
      </div>

      {/* New Chat Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onNewChat}
        className="mx-4 flex items-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-gray-600/40 to-gray-500/40 text-white font-medium shadow-md hover:shadow-lg border border-white/10 transition-all"
      >
        <PlusCircle size={16} className="text-gray-300" />
        <span>New Chat</span>
      </motion.button>

      {/* Chat Sessions List */}
      <div className="flex-1 overflow-y-auto space-y-2 p-4 scrollbar-thin scrollbar-thumb-gray-800">
        {Array.isArray(chatSessions) && chatSessions.length > 0 ? (
          chatSessions.map((session, index) => {
            if (!Array.isArray(session)) return null;

            const firstUserMessage = session.find((msg) => msg.from === "user") || {};
            const title = firstUserMessage.text
              ? firstUserMessage.text.split(" ").slice(0, 8).join(" ") +
                (firstUserMessage.text.split(" ").length > 8 ? "..." : "")
              : `Chat ${index + 1}`;
            const timestamp = firstUserMessage?.time || "";
            const isActive = currentSessionIndex === index;

            return (
              <motion.button
                key={index}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSelectSession(index)}
                className={`w-full flex items-start gap-2 px-3 py-3 rounded-xl transition-all duration-200 text-left ${
                  isActive
                    ? "bg-gradient-to-r from-gray-500/20 to-gray-600/20 border border-white/10 shadow-md"
                    : "bg-white/5 hover:bg-white/10 border border-white/5"
                }`}
                title={title}
              >
                <div className={`p-1.5 rounded-full flex items-center justify-center ${
                  isActive 
                    ? "bg-gradient-to-br from-gray-400/30 to-gray-500/30 border border-white/10" 
                    : "bg-white/10"
                }`}>
                  <MessageSquare size={14} className={isActive ? "text-gray-300" : "text-gray-400"} />
                </div>
                <div className="flex flex-col w-full overflow-hidden">
                  <span className={`text-sm truncate ${isActive ? "text-white" : "text-gray-400"}`}>{title}</span>
                  {timestamp && (
                    <span className="text-xs text-gray-500 truncate">{timestamp}</span>
                  )}
                </div>
              </motion.button>
            );
          })
        ) : (
          <div className="text-center text-gray-500 py-6">
            <div className="flex flex-col items-center">
              <MessageSquare size={24} className="text-gray-600 mb-2 opacity-50" />
              <p>No chat history</p>
              <p className="text-xs mt-1">Start a new conversation</p>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Controls */}
      <div className="p-4 border-t border-white/5 space-y-2">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onDeleteAll}
          className="flex items-center justify-between w-full px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 font-medium transition-all border border-white/5"
        >
          <span>Clear History</span>
          <Trash2 size={16} className="text-gray-400" />
        </motion.button>
      </div>
    </div>
  );
};

export default Sidebar;