import { motion } from "framer-motion";

const MotionWrapper = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}   // Start with hidden state
      animate={{ opacity: 1, y: 0 }}    // Fade in and move to normal position
      exit={{ opacity: 0, y: -20 }}     // Fade out and move upward
      transition={{ duration: 0.2, ease: "easeInOut" }}  // Smooth transition timing
      style={{
        minHeight: "100vh",   // Ensure the wrapper covers full screen
        backgroundColor: "transparent",  // Make sure background is transparent during fade
      }}
    >
      {children}
    </motion.div>
  );
};

export default MotionWrapper;
