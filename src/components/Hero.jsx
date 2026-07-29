import React from "react";
import { FaDownload, FaGithub, FaChrome, FaExpand } from "react-icons/fa";
import Background from "./Background";
import Foreground from "./Foreground";

const Hero = ({ cards, toggleStatus, deleteCard, onOpenForm }) => {
  return (
    <section className="pt-12 pb-20 px-6 max-w-7xl mx-auto space-y-12">
      {/* Title & Headline Section */}
      <div className="text-center max-w-4xl mx-auto space-y-6">
        <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
          <FaChrome className="text-sm" />
          <span>New Tab Extension for Chrome & Edge</span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.1]">
          Transform Your New Tab into a{" "}
          <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Productive Task Canvas
          </span>
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          Google Search with real-time autocomplete suggestions, draggable sticky note task cards, and local storage persistence—right inside your new tab.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <a
            href="/docs-app-extension.zip"
            download="docs-app-extension.zip"
            className="flex items-center space-x-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-7 py-4 rounded-2xl font-bold shadow-xl shadow-blue-600/30 transition-all duration-300 active:scale-95 text-base"
          >
            <FaDownload className="text-lg" />
            <span>Download Extension (.zip)</span>
          </a>

          <a
            href="https://www.github.com/beastwaleed"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-3 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-700/80 px-7 py-4 rounded-2xl font-bold shadow-lg transition-all duration-300 active:scale-95 text-base"
          >
            <FaGithub className="text-xl" />
            <span>View on GitHub</span>
          </a>
        </div>
      </div>

      {/* Interactive Live Demo Frame */}
      <div id="demo" className="w-full pt-4">
        <div className="text-center mb-4 flex items-center justify-center space-x-2 text-zinc-400 text-xs font-semibold uppercase tracking-wider">
          <FaExpand className="text-blue-400" />
          <span>Interactive Live Demo — Try dragging cards & searching below</span>
        </div>

        {/* Browser Mockup Window Frame */}
        <div className="relative w-full h-[600px] md:h-[680px] bg-zinc-950 rounded-3xl border border-zinc-800/90 shadow-2xl overflow-hidden flex flex-col">
          {/* Top Window Bar */}
          <div className="w-full bg-zinc-900/90 border-b border-zinc-800/80 px-4 py-3 flex items-center justify-between z-40 select-none">
            {/* Window control dots */}
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
            </div>

            {/* Fake URL Bar */}
            <div className="bg-zinc-950/80 text-zinc-400 px-6 py-1 rounded-full text-xs font-mono border border-zinc-800 flex items-center space-x-2">
              <span className="text-emerald-400">🔒</span>
              <span>chrome://newtab</span>
            </div>

            <div className="text-xs text-zinc-500 font-semibold hidden sm:block">
              New Tab Board
            </div>
          </div>

          {/* Embedded Interactive Extension Canvas */}
          <div
            className="relative w-full flex-1 overflow-hidden"
            onDoubleClick={onOpenForm}
          >
            <Background />
            <Foreground
              cards={cards}
              toggleStatus={toggleStatus}
              deleteCard={deleteCard}
              onOpenForm={onOpenForm}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
