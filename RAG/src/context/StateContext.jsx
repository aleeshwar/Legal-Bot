// src/context/StateContext.js
import React, { createContext, useState, useContext } from "react";

// Create the context
const StateContext = createContext();

// Create the provider component
export const StateProvider = ({ children }) => {
  const [chatSessions, setChatSessions] = useState([]); // Example state

  return (
    <StateContext.Provider value={{ chatSessions, setChatSessions }}>
      {children}
    </StateContext.Provider>
  );
};

// Custom hook to access the state
export const useStateContext = () => useContext(StateContext);
