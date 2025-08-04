import { motion } from "framer-motion";

const PageWrapper = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }} // Start with 0 opacity (hidden)
      animate={{ opacity: 1 }} // Animate to full opacity
      exit={{ opacity: 0 }} // Fade out when exiting
      transition={{ duration: 0.2, ease: "easeInOut" }} // Transition duration and easing for a smooth effect
      style={{
        minHeight: "100vh",  // Ensure full page height
      }}
    >
      {children}
    </motion.div>
  );
};

export default PageWrapper;
