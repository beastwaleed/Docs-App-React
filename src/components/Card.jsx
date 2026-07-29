import React from "react";
import { FaRegFileAlt, FaTrash } from "react-icons/fa";
import { motion } from "framer-motion";

const Card = ({ id, description, complexity, status, onToggle, onDelete, reference }) => {
  // Complexity badge color selection
  const getComplexityBadge = (comp) => {
    switch (comp?.toLowerCase()) {
      case "high":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      case "medium":
        return "bg-amber-500/20 text-amber-400 border-amber-500/30";
      case "low":
        return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
      default:
        return "bg-zinc-700/40 text-zinc-300 border-zinc-600/40";
    }
  };

  return (
    <motion.div
      drag
      dragConstraints={reference}
      whileDrag={{ scale: 1.05, cursor: "grabbing" }}
      className="relative w-64 h-80 bg-zinc-900/90 backdrop-blur-md rounded-[24px] px-6 py-6 text-white overflow-hidden border border-zinc-800/80 shadow-xl hover:shadow-2xl hover:border-zinc-700/80 transition-shadow duration-300 flex flex-col justify-between cursor-grab select-none z-10 pointer-events-auto"
      onDoubleClick={(e) => e.stopPropagation()}
    >
      {/* Header section */}
      <div>
        <div className="flex items-center justify-between">
          <div className="p-2.5 bg-zinc-800/80 rounded-xl text-blue-400 border border-zinc-700/40">
            <FaRegFileAlt size="1.1em" />
          </div>
          <button
            onClick={() => onDelete(id)}
            className="text-zinc-500 hover:text-red-400 p-2 rounded-lg hover:bg-red-500/10 transition-colors"
            title="Delete task"
          >
            <FaTrash size="0.9em" />
          </button>
        </div>

        {/* Task description */}
        <p className="text-base font-medium mt-4 text-zinc-200 leading-snug line-clamp-5">
          {description}
        </p>
      </div>

      {/* Footer section */}
      <div className="w-full space-y-3 pt-2">
        <div className="flex items-center justify-between px-1">
          <span
            className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${getComplexityBadge(
              complexity
            )}`}
          >
            {complexity || "Normal"}
          </span>
        </div>

        {/* Status toggle button */}
        <div
          onClick={() => onToggle(id)}
          className={`w-full py-2.5 rounded-xl font-bold flex items-center justify-center cursor-pointer transition-all duration-300 text-sm ${
            status === "Completed"
              ? "bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-900/30"
              : "bg-amber-600/90 hover:bg-amber-500 text-white shadow-lg shadow-amber-900/30"
          }`}
        >
          <span>{status === "Completed" ? "✓ Completed" : "⏳ Pending"}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default Card;
