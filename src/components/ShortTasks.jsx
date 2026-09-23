import React, { useRef } from "react";
import { FaPlay, FaEdit, FaTrash, FaPlus, FaCheck, FaClock } from "react-icons/fa";

const COMPLEXITY_BADGE = {
  Low: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  Medium: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  High: "bg-red-500/20 text-red-400 border-red-500/30",
};

const ShortTasks = ({ tasks, onAdd, onEdit, onDelete, onStart, onComplete }) => {
  const scrollRef = useRef(null);

  const pendingTasks = tasks.filter((t) => t.status !== "Completed");
  const completedTasks = tasks.filter((t) => t.status === "Completed");

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-base">⚡</span>
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">Today's Tasks</h2>
          {tasks.length > 0 && (
            <span className="text-[10px] font-bold text-zinc-400 bg-zinc-800 px-2 py-0.5 rounded-full">
              {completedTasks.length}/{tasks.length}
            </span>
          )}
        </div>
        <button
          onClick={onAdd}
          className="flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-blue-300 bg-blue-500/10 hover:bg-blue-500/20 px-3 py-1.5 rounded-full border border-blue-500/20 transition-all active:scale-95"
        >
          <FaPlus className="text-[10px]" />
          <span>Add Task</span>
        </button>
      </div>

      {/* Horizontal Scrollable Row */}
      {tasks.length === 0 ? (
        <div
          onClick={onAdd}
          className="w-full py-10 border-2 border-dashed border-zinc-800/80 rounded-2xl flex flex-col items-center gap-2 cursor-pointer hover:border-zinc-700 transition-colors group"
        >
          <div className="p-3 rounded-full bg-zinc-800/60 text-zinc-500 group-hover:text-blue-400 transition-colors">
            <FaPlus />
          </div>
          <p className="text-xs text-zinc-500 group-hover:text-zinc-400">Click to add your first task for today</p>
        </div>
      ) : (
        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto pb-4 smooth-scroll custom-scrollbar"
        >
          {/* Pending Tasks */}
          {pendingTasks.map((task) => (
            <div
              key={task.id}
              className="flex-shrink-0 w-56 bg-zinc-900/70 backdrop-blur-md border border-zinc-800/80 rounded-2xl p-4 flex flex-col justify-between hover:border-zinc-700/80 transition-all group"
            >
              <div>
                <div className="flex items-start justify-between mb-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${COMPLEXITY_BADGE[task.complexity]}`}>
                    {task.complexity}
                  </span>
                  <div className="flex items-center gap-1 text-zinc-500 text-[10px]">
                    <FaClock className="text-[9px]" />
                    <span>{task.estimatedTime}</span>
                  </div>
                </div>
                <p className="text-sm font-semibold text-white leading-snug mt-2 line-clamp-3">
                  {task.title}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-zinc-800/60">
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => onStart(task.id)}
                    className="p-2 rounded-lg text-emerald-400 hover:bg-emerald-500/15 transition-colors"
                    title="Start Focus"
                  >
                    <FaPlay className="text-xs" />
                  </button>
                  <button
                    onClick={() => onEdit(task)}
                    className="p-2 rounded-lg text-blue-400 hover:bg-blue-500/15 transition-colors"
                    title="Edit"
                  >
                    <FaEdit className="text-xs" />
                  </button>
                  <button
                    onClick={() => onDelete(task.id)}
                    className="p-2 rounded-lg text-red-400 hover:bg-red-500/15 transition-colors"
                    title="Delete"
                  >
                    <FaTrash className="text-xs" />
                  </button>
                </div>
                <button
                  onClick={() => onComplete(task.id)}
                  className="p-2 rounded-lg text-zinc-500 hover:text-emerald-400 hover:bg-emerald-500/10 transition-colors"
                  title="Mark Complete"
                >
                  <FaCheck className="text-xs" />
                </button>
              </div>
            </div>
          ))}

          {/* Completed Tasks */}
          {completedTasks.map((task) => (
            <div
              key={task.id}
              className="flex-shrink-0 w-56 bg-zinc-900/40 backdrop-blur-md border border-zinc-800/50 rounded-2xl p-4 flex flex-col justify-between opacity-60"
            >
              <div>
                <div className="flex items-start justify-between mb-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full border bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                    ✓ Done
                  </span>
                  <div className="flex items-center gap-1 text-zinc-600 text-[10px]">
                    <FaClock className="text-[9px]" />
                    <span>{task.estimatedTime}</span>
                  </div>
                </div>
                <p className="text-sm font-semibold text-zinc-400 leading-snug mt-2 line-through line-clamp-3">
                  {task.title}
                </p>
              </div>
              <div className="flex items-center justify-end mt-4 pt-3 border-t border-zinc-800/40">
                <button
                  onClick={() => onDelete(task.id)}
                  className="p-2 rounded-lg text-zinc-600 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                  title="Delete"
                >
                  <FaTrash className="text-xs" />
                </button>
              </div>
            </div>
          ))}

          {/* Inline Add Card */}
          <div
            onClick={onAdd}
            className="flex-shrink-0 w-44 bg-zinc-900/30 border-2 border-dashed border-zinc-800/60 rounded-2xl flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-zinc-700 hover:bg-zinc-900/50 transition-all group min-h-[160px]"
          >
            <div className="p-2.5 rounded-full bg-zinc-800/40 text-zinc-500 group-hover:text-blue-400 transition-colors">
              <FaPlus className="text-sm" />
            </div>
            <span className="text-[10px] text-zinc-500 group-hover:text-zinc-400 font-semibold">Add Task</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShortTasks;
