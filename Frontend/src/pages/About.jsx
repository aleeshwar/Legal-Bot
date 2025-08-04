import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import PageWrapper from "../components/PageWrapper";
import { motion } from "framer-motion";

const About = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);
  
  // Company features with improved descriptions
  const features = [
    {
      title: "AI-Powered Legal Assistance",
      description: "Our advanced algorithms provide accurate and reliable legal information instantly, saving you hours of research time.",
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
    },
    {
      title: "Document Analysis",
      description: "Upload and analyze legal documents with our NLP system that extracts key information and delivers clear insights.",
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
    },
    {
      title: "Privacy First",
      description: "Your data is encrypted end-to-end with enterprise-grade security, ensuring complete confidentiality throughout the process.",
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
    }
  ];

  // Team members
  const team = [
    { name: "Jayanth", image: "/api/placeholder/80/80", role:"Computer Science Of Engineering" },
    { name: "Krithika", image: "/api/placeholder/80/80", role:"Computer Science Of Engineering(IOT)" },
    { name: "Pavan", image: "/api/placeholder/80/80", role:"Computer Science Of Engineering" },
    { name: "Avigna", image: "/api/placeholder/80/80", role:"Computer Science Of Engineering(IOT)" },
    { name: "Eshwar", image: "/api/placeholder/80/80", role:"Computer Science Of Engineering(IOT)" },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 12 }
    }
  };

  const handleEmailClick = (e) => {
    e.preventDefault();
    window.location.href = "mailto:vidhikai25@gmail.com";
  };

  return (
    <PageWrapper>
      <div className="min-h-screen bg-black text-white">
        <Navbar />

        <div className="relative w-full overflow-hidden">
          {/* Background - Changed to match Chat.js theme */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/30 via-gray-800/20 to-gray-900/30 blur-3xl opacity-30">
            <div className="absolute inset-0 animate-pulse" style={{animationDuration: '8s'}}></div>
          </div>
          
          {/* Particle effects */}
          <div className="absolute inset-0 overflow-hidden opacity-20">
            {[...Array(20)].map((_, i) => (
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
          
          {/* Hero Section */}
          <motion.div 
            className="relative z-10 py-20 md:py-24 px-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className="mb-6 flex justify-center"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              {/* Changed to match Chat.js styling */}
              <div className="h-20 w-20 rounded-full bg-gradient-to-br from-gray-400/20 to-gray-500/20 flex items-center justify-center border border-white/20 shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                </svg>
              </div>
            </motion.div>
            
            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-6 text-center leading-tight"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              {/* Changed gradient to match Chat.js */}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-300">                 
                Transforming Legal Research               
              </span>             
            </motion.h1>
            
            <motion.p 
              className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              We are a team of engineering innovators building an advanced
              {/* Changed highlight color to match Chat.js */}
              <span className="text-gray-200"> Retrieval-Augmented Generation </span>
              system for legal question answering from Indian legal documents.
            </motion.p>
            
            <motion.div 
              className="mt-8 flex flex-wrap justify-center gap-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.5 }}
            >
              {/* Only Contact Us button now */}
              <motion.a 
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-white/10 rounded-xl text-white font-medium border border-white/20"
              >
                Contact Us
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Features Section */}
          <motion.div 
            id="features"
            className="relative z-10 py-16 px-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
          >
            <div className="max-w-6xl mx-auto">
              <motion.div className="text-center mb-10" variants={itemVariants}>
                {/* Changed gradient to match Chat.js */}
                <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-300">
                  What Sets Us Apart
                </h2>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-6">
                {features.map((feature, index) => (
                  <motion.div 
                    key={index}
                    className="bg-white/5 p-5 rounded-xl border border-white/10 shadow-xl group hover:border-gray-500/30 transition-all duration-300"
                    whileHover={{ y: -5 }}
                    variants={itemVariants}
                  >
                    {/* Changed icons and colors to match Chat.js */}
                    <div className="h-16 w-16 rounded-full bg-gradient-to-br from-gray-400/20 to-gray-500/20 flex items-center justify-center mx-auto mb-5 border border-gray-500/30 shadow-lg">
                      <div className="text-gray-300 group-hover:text-white transition-colors">
                        {feature.icon}
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-bold mb-3 text-center group-hover:text-gray-200 transition-colors">
                      {feature.title}
                    </h3>
                    
                    <p className="text-gray-300 text-center text-sm">
                      {feature.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Team Section */}
          <motion.div 
            id="team"
            className="relative z-10 py-16 px-6 bg-gradient-to-b from-transparent to-black/40"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
          >
            <div className="max-w-6xl mx-auto">
              <motion.div className="text-center mb-10" variants={itemVariants}>
                {/* Changed gradient to match Chat.js */}
                <h2 className="text-3xl md:text-5xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-300">
                  Meet Our Team
                </h2>
                
                <div className="grid grid-cols-3 md:grid-cols-5 gap-8">
                  {team.map((member, index) => (
                    <motion.div 
                      key={index}
                      className="bg-white/5 p-4 rounded-xl border border-white/10 shadow-xl hover:border-gray-500/30 transition-all duration-300"
                      whileHover={{ y: -5 }}
                      variants={itemVariants}
                    >
                      <div className="mb-4 flex justify-center">
                        {/* Changed colors to match Chat.js */}
                        <div className="h-16 w-16 rounded-full bg-gradient-to-br from-gray-400/20 to-gray-500/20 flex items-center justify-center border border-gray-500/30">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                      </div>
                      <h3 className="text-base font-bold text-white text-center">{member.name}</h3>
                      <h3 className="text-base font text-white text-center">{member.role}</h3>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
          
          {/* Contact Section - Simplified */}
          <motion.div 
            id="contact"
            className="relative z-10 py-16 px-6 bg-gradient-to-b from-black/40 to-black/70"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
          >
            <div className="max-w-5xl mx-auto">
              <motion.div className="text-center mb-10" variants={itemVariants}>
                {/* Changed gradient to match Chat.js */}
                <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-300">
                  Get In Touch
                </h2>
                
                <motion.div 
                  className="bg-white/5 p-8 rounded-xl border border-white/10 shadow-xl"
                  variants={itemVariants}
                >
                  <div className="text-center">
                    {/* Changed colors to match Chat.js */}
                    <div className="h-16 w-16 mx-auto rounded-full bg-gradient-to-br from-gray-400/20 to-gray-500/20 flex items-center justify-center border border-gray-500/30 mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">Keshav Memorial College of Engineering</h3>
                    <p className="text-gray-300 mb-2">Ibrahimpatnam, Hyderabad</p>
                    <p className="text-gray-300 mb-6">Telangana, India</p>
                    
                    <a 
                      href="mailto:vidhikai25@gmail.com" 
                      onClick={handleEmailClick}
                      className="inline-flex items-center text-gray-200 hover:text-white transition-colors group bg-white/5 px-4 py-2 rounded-xl border border-white/10 hover:border-white/20"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 group-hover:text-gray-300 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span className="text-base font-medium group-hover:text-gray-300 transition-colors">vidhikai25@gmail.com</span>
                    </a>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Keyframes for floating particles */}
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

export default About;