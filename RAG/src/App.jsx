// src/App.jsx
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// Pages
import Chat from "./pages/Home";
import Query from "./pages/Query";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/Signup";
import About from "./pages/About";
import DocumentQuery from "./pages/DocumentQuery";
// import ForgotPassword from "./pages/ForgotPassword";



// StateProvider
import { StateProvider } from "./context/StateContext";

function App() {
  const location = useLocation();

  return (
    <StateProvider>
      <div className="relative overflow-hidden min-h-screen">
        <AnimatePresence mode="wait" initial={false}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Chat />} />
            <Route path="/query" element={<Query />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/about" element={<About />} />
            <Route path="/document-query" element={<DocumentQuery />} />
            {/* <Route path="/forgot" element={<ForgotPassword />} /> */}

          </Routes>
        </AnimatePresence>
      </div>
    </StateProvider>
  );
}

export default App;
