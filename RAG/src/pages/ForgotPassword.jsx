// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";

// const ForgotPassword = () => {
//   const navigate = useNavigate();
//   const [step, setStep] = useState(1);        // 1 = enter email, 2 = code+new pw
//   const [email, setEmail] = useState("");
//   const [code,  setCode]  = useState("");
//   const [userCode, setUserCode] = useState("");
//   const [pw1, setPw1] = useState("");
//   const [pw2, setPw2] = useState("");
//   const [msg, setMsg] = useState("");

//   /* --- helpers ----------------------------------------------------------- */
//   const makeCode = () => Math.floor(100000 + Math.random()*900000).toString(); // 6‑digit

//   /* --- step 1: request --------------------------------------------------- */
//   const handleRequest = (e) => {
//     e.preventDefault();
//     const users = JSON.parse(localStorage.getItem("users")) || {};
//     if (!users[email]) return setMsg("Account not found.");
//     const newCode = makeCode();
//     localStorage.setItem("resetCode", JSON.stringify({ email, code:newCode, exp:Date.now()+600000 }));
//     setCode(newCode);          // show once on screen
//     setStep(2);
//   };

//   /* --- step 2: confirm --------------------------------------------------- */
//   const handleConfirm = (e) => {
//     e.preventDefault();
//     const data = JSON.parse(localStorage.getItem("resetCode") || "{}");
//     if (Date.now() > (data.exp||0))  return setMsg("Code expired. Start again.");
//     if (email !== data.email || userCode !== data.code) return setMsg("Wrong code.");
//     if (pw1 !== pw2) return setMsg("Passwords don't match.");
//     if (!/[!@#$%^&*(),.?":{}|<>]/.test(pw1)) return setMsg("Need one special char.");

//     /* save new password */
//     const users = JSON.parse(localStorage.getItem("users"));
//     users[email].password = pw1;
//     localStorage.setItem("users", JSON.stringify(users));
//     localStorage.removeItem("resetCode");
//     setMsg("✅ Password reset! Redirecting…");
//     setTimeout(()=>navigate("/signin"), 1500);
//   };

//   /* --- UI ---------------------------------------------------------------- */
//   return (
//     <div className="fixed inset-0 bg-black flex items-center justify-center p-4 z-50">
//       {/* Enhanced background with subtle animation */}
//       <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/30 via-purple-800/20 to-blue-900/30 blur-3xl opacity-30">
//         <div className="absolute inset-0 animate-pulse" style={{animationDuration: '8s'}}></div>
//       </div>
      
//       {/* Subtle particle effects - reduced number */}
//       <div className="absolute inset-0 overflow-hidden opacity-20">
//         {[...Array(8)].map((_, i) => (
//           <div 
//             key={i}
//             className="absolute rounded-full bg-white/60"
//             style={{
//               width: Math.random() * 3 + 1 + 'px',
//               height: Math.random() * 3 + 1 + 'px',
//               top: Math.random() * 100 + '%',
//               left: Math.random() * 100 + '%',
//               animation: `float ${Math.random() * 10 + 20}s linear infinite`
//             }}
//           />
//         ))}
//       </div>

//       <motion.div 
//         initial={{scale:.8, opacity:0}} 
//         animate={{scale:1, opacity:1}}
//         className="relative z-10 w-full max-w-sm bg-gradient-to-br from-white/5 to-white/10 p-6 rounded-xl backdrop-blur-lg border border-white/10 shadow-xl overflow-y-auto"
//       >
//         {step === 1 && (
//           <form onSubmit={handleRequest}>
//             {/* Badge */}
//               <div className="inline-block px-3 py-1 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-gray-300 text-xs font-medium mb-4">
//               Password Recovery
//             </div>
            
//             <h2 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-300">
//               Forgot Password
//             </h2>
            
//             {msg && (
//               <div className="mb-6 p-3 rounded-lg bg-white/5 border border-white/10 text-gray-300 text-center">
//                 {msg}
//               </div>
//             )}
            
//             <div className="mb-4">
//               <label className="block text-gray-300 text-xs mb-1">Email Address</label>
//               <input 
//                 required 
//                 type="email" 
//                 placeholder="you@example.com"
//                 value={email} 
//                 onChange={e => setEmail(e.target.value)}
//                 className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20"
//               />
//             </div>
            
//             <motion.button
//               whileHover={{ scale: 1.03 }}
//               whileTap={{ scale: 0.97 }}
//               className="w-full bg-gradient-to-r from-gray-600/40 to-gray-500/40 text-white font-semibold px-4 py-3 rounded-lg backdrop-blur-md border border-white/20 hover:border-white/30 shadow-lg transition-all group overflow-hidden"
//             >
//               <span className="flex items-center justify-center gap-2">
//                 Send Reset Code
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                 </svg>
//               </span>
//               <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
//             </motion.button>
            
//             <div className="mt-4 text-center">
//               <button 
//                 type="button" 
//                 onClick={() => navigate("/signin")}
//                 className="text-gray-400 hover:text-white transition-colors text-sm"
//               >
//                 Back to Sign In
//               </button>
//             </div>
//           </form>
//         )}

//         {step === 2 && (
//           <form onSubmit={handleConfirm}>
//             {/* Badge */}
//             <div className="inline-block px-3 py-1 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-gray-300 text-xs font-medium mb-4">
//               Password Reset
//             </div>
            
//             <h2 className="text-2xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-300">
//               Create New Password
//             </h2>
            
//             <div className="p-3 mb-4 rounded-lg bg-white/10 border border-white/20">
//               <p className="text-gray-300 text-xs mb-1">Your verification code:</p>
//               <p className="font-mono text-lg text-center text-white">{code}</p>
//             </div>
            
//             {msg && (
//               <div className={`mb-4 p-2 rounded-lg ${msg.includes("✅") ? "bg-green-900/20 border-green-500/30" : "bg-white/5 border-white/10"} border text-gray-300 text-center text-sm`}>
//                 {msg}
//               </div>
//             )}
            
//             <div className="space-y-3 mb-4">
//               <div>
//                 <label className="block text-gray-300 text-xs mb-1">Email Address</label>
//                 <input 
//                   required 
//                   placeholder="Confirm your email"
//                   value={email} 
//                   onChange={e => setEmail(e.target.value)}
//                   className="w-full p-3 rounded-lg bg-white/5 border border-white/10 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-white/20"
//                 />
//               </div>
              
//               <div>
//                 <label className="block text-gray-300 text-xs mb-1">Verification Code</label>
//                 <input 
//                   required 
//                   placeholder="Enter 6-digit code"
//                   value={userCode} 
//                   onChange={e => setUserCode(e.target.value)}
//                   className="w-full p-3 rounded-lg bg-white/5 border border-white/10 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-white/20"
//                 />
//               </div>
              
//               <div>
//                 <label className="block text-gray-300 text-xs mb-1">New Password</label>
//                 <input 
//                   required 
//                   type="password" 
//                   placeholder="Include one special character"
//                   value={pw1} 
//                   onChange={e => setPw1(e.target.value)}
//                   className="w-full p-3 rounded-lg bg-white/5 border border-white/10 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-white/20"
//                 />
//               </div>
              
//               <div>
//                 <label className="block text-gray-300 text-xs mb-1">Confirm Password</label>
//                 <input 
//                   required 
//                   type="password" 
//                   placeholder="Repeat your password"
//                   value={pw2} 
//                   onChange={e => setPw2(e.target.value)}
//                   className="w-full p-3 rounded-lg bg-white/5 border border-white/10 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-white/20"
//                 />
//               </div>
//             </div>
            
//             <motion.button
//               whileHover={{ scale: 1.03 }}
//               whileTap={{ scale: 0.97 }}
//               className="w-full bg-gradient-to-r from-gray-600/40 to-gray-500/40 text-white font-semibold px-6 py-4 rounded-xl backdrop-blur-md border border-white/20 hover:border-white/30 shadow-lg transition-all group overflow-hidden"
//             >
//               <span className="flex items-center justify-center gap-2">
//                 Reset Password
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                 </svg>
//               </span>
//               <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
//             </motion.button>
//           </form>
//         )}
//       </motion.div>

//       {/* Add keyframes for floating particles */}
//       <style jsx>{`
//         @keyframes float {
//           0% { transform: translateY(0) translateX(0); opacity: 0; }
//           10% { opacity: 0.8; }
//           90% { opacity: 0.8; }
//           100% { transform: translateY(-1000px) translateX(100px); opacity: 0; }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default ForgotPassword;