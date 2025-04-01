import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";
import { useAuth0 } from "@auth0/auth0-react";
import Login from "./Login";

const Logout = () => {
  const { logout } = useAuth0();

  return (
    <button
      onClick={() => {
        logout({ returnTo: window.location.origin + "/logout" });
      }}
      className="cursor-pointer text-black text-sm rounded flex items-center hover:bg-red-500 transition duration-300 ease-in-out p-2 font-bold"
    >
      Log Out
    </button>
  );
};

const Landing = () => {
  const navigate = useNavigate(); // React Router navigation

  return (
    <div className="landing-container">
      {/* Dark Overlay */}
      <div className="overlay"></div>

     
      <div className="nav-bar">
        <Login />
        <Logout />
      </div> 

      {/* Main Content */}
      <div className="content">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="title"
        >
          Welcome to <span className="highlight">TechBridge</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="subtitle"
        >
          Bridging Knowledge & Innovation for a Smarter Future
        </motion.p>

        {/* CTA Button - Redirect to /question */}
        <motion.button
          onClick={() => navigate("/search")} // Ensure this navigates correctly
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="cta-button"
        >
          Get Started 🚀
        </motion.button>
      </div>
    </div>
  );
};

export default Landing;