import React from "react";
import { FaGithub, FaLinkedin, FaDownload, FaChrome } from "react-icons/fa";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-800/80 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center space-x-3 group">
          <div className="p-2 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-xl text-white shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <FaChrome className="text-xl" />
          </div>
          <div>
            <span className="text-lg font-bold text-white tracking-tight">
              TaskBoard<span className="text-blue-500">Tab</span>
            </span>
            <span className="hidden sm:inline-block text-[10px] uppercase tracking-wider font-extrabold px-2 py-0.5 ml-2 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full">
              v1.0 Extension
            </span>
          </div>
        </a>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-semibold text-zinc-400">
          <a href="#demo" className="hover:text-white transition-colors">
            Live Demo
          </a>
          <a href="#features" className="hover:text-white transition-colors">
            Features
          </a>
          <a href="#install" className="hover:text-white transition-colors">
            How to Install
          </a>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center space-x-3">
          {/* GitHub Profile */}
          <a
            href="https://www.github.com/beastwaleed"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-zinc-300 hover:text-white bg-zinc-900 hover:bg-zinc-800 px-3.5 py-2 rounded-xl border border-zinc-800 text-sm font-semibold transition-all"
            title="View GitHub Profile"
          >
            <FaGithub className="text-lg" />
            <span className="hidden sm:inline">GitHub</span>
          </a>

          {/* LinkedIn Profile */}
          <a
            href="https://www.linkedin.com/in/digiwaleed"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:flex items-center space-x-2 text-blue-400 hover:text-white bg-blue-500/10 hover:bg-blue-600 px-3.5 py-2 rounded-xl border border-blue-500/20 text-sm font-semibold transition-all"
            title="LinkedIn Profile"
          >
            <FaLinkedin className="text-lg" />
          </a>

          {/* Download Extension ZIP */}
          <a
            href="/docs-app-extension.zip"
            download="docs-app-extension.zip"
            className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-lg shadow-blue-600/25 transition-all duration-200 active:scale-95"
          >
            <FaDownload className="text-xs" />
            <span>Download ZIP</span>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
