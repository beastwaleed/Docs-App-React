import React from "react";
import { FaGithub, FaLinkedin, FaDownload, FaChrome } from "react-icons/fa";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-xl border-b border-zinc-200/80 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center space-x-3 group">
          <div className="p-2 bg-zinc-900 rounded-xl text-white shadow-sm group-hover:scale-105 transition-transform">
            <FaChrome className="text-xl" />
          </div>
          <div>
            <span className="text-lg font-bold text-zinc-900 tracking-tight">
              TaskBoard<span className="text-zinc-500">Tab</span>
            </span>
            <span className="hidden sm:inline-block text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 ml-2 bg-zinc-100 text-zinc-500 border border-zinc-200 rounded-full">
              v1.0 Extension
            </span>
          </div>
        </a>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-semibold text-zinc-500">
          <a href="#demo" className="hover:text-zinc-900 transition-colors">
            Live Demo
          </a>
          <a href="#features" className="hover:text-zinc-900 transition-colors">
            Features
          </a>
          <a href="#install" className="hover:text-zinc-900 transition-colors">
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
            className="flex items-center space-x-2 text-zinc-600 hover:text-zinc-900 bg-white hover:bg-zinc-50 px-3.5 py-2 rounded-xl border border-zinc-200 text-sm font-semibold transition-all"
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
            className="hidden lg:flex items-center space-x-2 text-zinc-400 hover:text-zinc-900 bg-transparent px-3.5 py-2 rounded-xl text-sm font-semibold transition-all"
            title="LinkedIn Profile"
          >
            <FaLinkedin className="text-lg" />
          </a>

          {/* Download Extension ZIP */}
          <a
            href="/docs-app-extension.zip"
            download="docs-app-extension.zip"
            className="flex items-center space-x-2 bg-zinc-900 hover:bg-zinc-800 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-sm transition-all duration-200 active:scale-95"
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
