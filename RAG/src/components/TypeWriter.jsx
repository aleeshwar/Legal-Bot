// src/components/TypeWriter.js
import React, { useState, useEffect } from 'react';

const TypeWriter = ({ text, speed = 1 }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  
  useEffect(() => {
    if (!text) return;
    
    setDisplayedText("");
    setIsComplete(false);
    
    let currentIndex = 0;
    const charsPerFrame = Math.max(1, Math.floor(text.length / 100)); // Adaptive typing speed
    
    const interval = setInterval(() => {
      if (currentIndex < text.length) {
        const nextChunk = text.substring(currentIndex, currentIndex + charsPerFrame);
        setDisplayedText(prev => prev + nextChunk);
        currentIndex += charsPerFrame;
      } else {
        setIsComplete(true);
        clearInterval(interval);
      }
    }, 30 / speed); // Adjust for speed parameter
    
    return () => clearInterval(interval);
  }, [text, speed]);
  
  const handleClick = () => {
    if (!isComplete) {
      setDisplayedText(text);
      setIsComplete(true);
    }
  };

  return (
    <div onClick={handleClick} className={`cursor-pointer ${!isComplete ? 'typewriter-active' : ''}`}>
      {displayedText}
      {!isComplete && <span className="inline-block w-1 h-4 ml-1 bg-blue-400 animate-blink"></span>}
    </div>
  );
};

export default TypeWriter;