import React from "react";
import { FaGithub, FaLinkedin, FaHeart } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full bg-zinc-950 border-t border-zinc-800/80 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand & Attribution */}
        <div className="text-center md:text-left space-y-1">
          <p className="text-white font-bold text-base flex items-center justify-center md:justify-start gap-1">
            <span>TaskBoard Tab Extension</span>
            <span className="text-zinc-500 font-normal">| Built with</span>
            <FaHeart className="text-red-500 text-xs inline" />
            <span className="text-zinc-500 font-normal">by</span>
            <span className="text-blue-400 font-bold">Waleed</span>
          </p>
          <p className="text-xs text-zinc-500">
            Open-source Browser Extension Dashboard for Chrome, Edge & Brave.
          </p>
        </div>

        {/* Social / Dev Links */}
        <div className="flex items-center space-x-4">
          <a
            href="https://www.github.com/beastwaleed"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white rounded-xl border border-zinc-800 transition-colors"
            title="GitHub: beastwaleed"
          >
            <FaGithub className="text-lg" />
          </a>
          <a
            href="https://www.linkedin.com/in/digiwaleed"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 bg-zinc-900 hover:bg-zinc-800 text-blue-400 hover:text-white rounded-xl border border-zinc-800 transition-colors"
            title="LinkedIn: digiwaleed"
          >
            <FaLinkedin className="text-lg" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
