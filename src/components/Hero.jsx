import React from "react";
import { FaDownload, FaGithub, FaChrome, FaExpand } from "react-icons/fa";
const Hero = () => {
  return (
    <section className="pt-12 pb-20 px-6 max-w-7xl mx-auto space-y-12">
      {/* Title & Headline Section */}
      <div className="text-center max-w-4xl mx-auto space-y-6">
        <div className="inline-flex items-center space-x-2 bg-zinc-100 border border-zinc-200 text-zinc-600 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
          <FaChrome className="text-sm" />
          <span>New Tab Extension for Chrome & Edge</span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-zinc-900 tracking-tight leading-[1.1]">
          Transform Your New Tab into a{" "}
          <span className="text-blue-600">
            Productive Task Canvas
          </span>
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-zinc-500 max-w-2xl mx-auto leading-relaxed">
          Supercharge your workflow with daily tasks, focus timers, long-term goals, and custom themes—all beautifully integrated right into your new tab.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <a
            href="/docs-app-extension.zip"
            download="docs-app-extension.zip"
            className="flex items-center space-x-3 bg-zinc-900 hover:bg-zinc-800 text-white px-7 py-4 rounded-2xl font-bold shadow-xl shadow-zinc-200 transition-all duration-300 active:scale-95 text-base"
          >
            <FaDownload className="text-lg" />
            <span>Download Extension (.zip)</span>
          </a>

          <a
            href="https://www.github.com/beastwaleed"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-3 bg-white hover:bg-zinc-50 text-zinc-700 border border-zinc-200 px-7 py-4 rounded-2xl font-bold shadow-sm transition-all duration-300 active:scale-95 text-base"
          >
            <FaGithub className="text-xl" />
            <span>View on GitHub</span>
          </a>
        </div>
      </div>

      {/* Interactive Live Demo Frame */}
      <div id="demo" className="w-full pt-4">
        <div className="text-center mb-4 flex items-center justify-center space-x-2 text-zinc-400 text-xs font-semibold uppercase tracking-wider">
          <FaExpand className="text-zinc-400" />
          <span>Interactive Live Demo — Try it out below</span>
        </div>

        {/* Browser Mockup Window Frame */}
        <div className="relative w-full h-[600px] md:h-[680px] bg-zinc-50 rounded-3xl border border-zinc-200/60 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col">
          {/* Top Window Bar */}
          <div className="w-full bg-white border-b border-zinc-200/80 px-4 py-3 flex items-center justify-between z-40 select-none">
            {/* Window control dots */}
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-amber-400" />
              <div className="w-3 h-3 rounded-full bg-emerald-400" />
            </div>

            {/* Fake URL Bar */}
            <div className="bg-zinc-100 text-zinc-500 px-6 py-1 rounded-full text-xs font-mono border border-zinc-200 flex items-center space-x-2">
              <span className="text-emerald-500">🔒</span>
              <span>chrome://newtab</span>
            </div>

            <div className="text-xs text-zinc-400 font-semibold hidden sm:block">
              New Tab Board
            </div>
          </div>

          {/* Embedded Interactive Extension Canvas */}
          <div className="relative w-full flex-1 overflow-hidden">
            <iframe
              src="/extension.html"
              title="TaskBoard Tab Live Demo"
              className="w-full h-full border-none outline-none"
              sandbox="allow-scripts allow-same-origin"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
