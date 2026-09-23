import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { FaPause, FaPlay, FaCheck, FaTimes } from "react-icons/fa";

const parseEstimatedTime = (timeStr) => {
  if (!timeStr) return 30 * 60 * 1000;
  if (timeStr.includes("min")) return parseInt(timeStr) * 60 * 1000;
  if (timeStr.includes("hr")) {
    if (timeStr === "4hr+") return 4 * 60 * 60 * 1000;
    return parseFloat(timeStr) * 60 * 60 * 1000;
  }
  return 30 * 60 * 1000;
};

const FocusTimer = ({ focusState, onPause, onResume, onComplete, onCancel }) => {
  const [remaining, setRemaining] = useState(0);
  const intervalRef = useRef(null);

  const getRemainingMs = useCallback(() => {
    if (!focusState || !focusState.startedAt) return 0;
    const totalDuration = parseEstimatedTime(focusState.estimatedTime);
    const now = Date.now();
    const elapsed = now - focusState.startedAt;
    const pausedMs = focusState.totalPausedMs || 0;

    let currentElapsed = elapsed - pausedMs;
    if (focusState.pausedAt) {
      currentElapsed -= (now - focusState.pausedAt);
    }

    return Math.max(0, totalDuration - currentElapsed);
  }, [focusState]);

  useEffect(() => {
    if (!focusState?.isActive) return;

    const tick = () => {
      setRemaining(getRemainingMs());
    };

    tick();
    intervalRef.current = setInterval(tick, 1000);
    return () => clearInterval(intervalRef.current);
  }, [focusState, getRemainingMs]);

  if (!focusState?.isActive) return null;

  const totalSeconds = Math.ceil(remaining / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const pad = (n) => n.toString().padStart(2, "0");

  let timeDisplay = "";
  if (hours > 0) timeDisplay = `${hours}:${pad(minutes)}:${pad(seconds)}`;
  else timeDisplay = `${pad(minutes)}:${pad(seconds)}`;

  const isPaused = !!focusState.pausedAt;

  return (
    <motion.div
      drag
      dragConstraints={{ left: -window.innerWidth + 350, top: -window.innerHeight + 100, right: 0, bottom: 0 }}
      dragElastic={0.05}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 40, scale: 0.95 }}
      className="fixed bottom-6 right-6 z-[999] bg-zinc-900/95 backdrop-blur-2xl border border-zinc-700/60 rounded-2xl shadow-2xl shadow-black/50 select-none cursor-grab active:cursor-grabbing flex items-center gap-4 px-4 py-3"
    >
      {/* Left: Task info */}
      <div className="flex flex-col max-w-[150px] sm:max-w-[200px]">
        <div className="flex items-center gap-1.5">
          <span className="text-xs">🎯</span>
          <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider truncate">
            {isPaused ? "Paused" : "Focusing"}
          </span>
        </div>
        <span className="text-sm font-semibold text-white truncate mt-0.5" title={focusState.taskTitle}>
          {focusState.taskTitle}
        </span>
      </div>

      {/* Divider */}
      <div className="w-px h-8 bg-zinc-700/50 hidden sm:block" />

      {/* Middle: Timer */}
      <div className={`text-2xl font-extrabold tracking-wider font-mono min-w-[70px] text-center ${isPaused ? "text-amber-400" : "text-emerald-400"}`}>
        {timeDisplay}
      </div>

      {/* Divider */}
      <div className="w-px h-8 bg-zinc-700/50 hidden sm:block" />

      {/* Right: Controls */}
      <div className="flex items-center gap-1.5">
        {isPaused ? (
          <button
            onClick={onResume}
            className="w-9 h-9 flex items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 transition-colors"
            title="Resume"
          >
            <FaPlay className="text-[10px]" />
          </button>
        ) : (
          <button
            onClick={onPause}
            className="w-9 h-9 flex items-center justify-center rounded-xl bg-amber-500/20 text-amber-400 hover:bg-amber-500/30 transition-colors"
            title="Pause"
          >
            <FaPause className="text-[10px]" />
          </button>
        )}

        <button
          onClick={onComplete}
          className="w-9 h-9 flex items-center justify-center rounded-xl bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-colors"
          title="Mark Complete"
        >
          <FaCheck className="text-xs" />
        </button>

        <button
          onClick={onCancel}
          className="w-9 h-9 flex items-center justify-center rounded-xl text-zinc-500 hover:bg-red-500/20 hover:text-red-400 transition-colors ml-1"
          title="Cancel"
        >
          <FaTimes className="text-sm" />
        </button>
      </div>
    </motion.div>
  );
};

export default FocusTimer;
