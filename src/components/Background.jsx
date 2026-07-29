import React from "react";
import { FaLinkedin } from "react-icons/fa";

const Background = () => {
  return (
    <div className="absolute inset-0 z-[1] bg-gradient-to-br from-zinc-950 via-zinc-900 to-black w-full h-full overflow-hidden select-none pointer-events-none">
      {/* Top instruction hint */}
      <div className="w-full py-4 text-center text-zinc-500 font-semibold text-xs tracking-widest uppercase">
        Double click anywhere inside the frame to add a new task card
      </div>

      {/* Large central background watermark */}
      <h1 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[14vw] font-black text-zinc-800/20 leading-none tracking-tighter uppercase blur-[1px]">
        TASKS.
      </h1>

      {/* Ambient background glows */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl" />

      {/* LinkedIn Developer Credits Pill */}
      <a
        href="https://www.linkedin.com/in/digiwaleed"
        target="_blank"
        rel="noopener noreferrer"
        onDoubleClick={(e) => e.stopPropagation()}
        className="absolute bottom-5 right-6 z-40 flex items-center space-x-2 bg-zinc-900/90 hover:bg-blue-600 text-zinc-300 hover:text-white px-4 py-2 rounded-full border border-zinc-700/80 hover:border-blue-400 shadow-xl backdrop-blur-md transition-all duration-300 pointer-events-auto text-xs font-semibold group cursor-pointer active:scale-95"
        title="Connect with DigiWaleed on LinkedIn"
      >
        <FaLinkedin className="text-base text-blue-400 group-hover:text-white transition-colors" />
        <span>Built by Waleed</span>
      </a>
    </div>
  );
};

export default Background;
