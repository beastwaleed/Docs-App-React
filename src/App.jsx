import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import InstallGuide from "./components/InstallGuide";
import Footer from "./components/Footer";
import { FaTimes } from "react-icons/fa";

const App = () => {
  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-blue-500 selection:text-white">
      {/* Top Navbar */}
      <Navbar />

      {/* Hero Section with Interactive Live Demo */}
      <Hero />

      {/* Features Grid */}
      <Features />

      {/* How to Install Walkthrough */}
      <InstallGuide />

      {/* Footer */}
      <Footer />

    </div>
  );
};

export default App;
