import React, { useState } from "react";
import {
  FaPlay,
  FaEdit,
  FaTrash,
  FaPlus,
  FaCheck,
  FaClock,
  FaChevronDown,
  FaChevronRight,
} from "react-icons/fa";

const COMPLEXITY_BADGE = {
  Low: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  Medium: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  High: "bg-red-500/20 text-red-400 border-red-500/30",
};

const GoalCard = ({
  goal,
  onEditGoal,
  onDeleteGoal,
  onAddSubtask,
  onEditSubtask,
  onDeleteSubtask,
  onCompleteSubtask,
  onStartSubtask,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const completedCount = goal.subtasks.filter(
    (s) => s.status === "Completed"
  ).length;
  const totalCount = goal.subtasks.length;
  const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return (
    <div className="bg-zinc-900/70 backdrop-blur-md border border-zinc-800/80 rounded-2xl overflow-hidden hover:border-zinc-700/80 transition-all">
      {/* Goal Header */}
      <div
        className="flex items-center justify-between px-5 py-4 cursor-pointer select-none group"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <span className="text-zinc-400 group-hover:text-white transition-colors">
            {isExpanded ? (
              <FaChevronDown className="text-xs" />
            ) : (
              <FaChevronRight className="text-xs" />
            )}
          </span>
          <span className="text-base">📁</span>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-bold text-white truncate">
              {goal.title}
            </h3>
            {goal.description && (
              <p className="text-[11px] text-zinc-500 mt-0.5 truncate">
                {goal.description}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3 flex-shrink-0 ml-3">
          {/* Progress */}
          {totalCount > 0 && (
            <div className="flex items-center gap-2">
              <div className="w-20 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="text-[10px] font-bold text-zinc-400">
                {completedCount}/{totalCount}
              </span>
            </div>
          )}

          {/* Goal Actions */}
          <div
            className="flex items-center gap-1"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => onEditGoal(goal)}
              className="p-1.5 rounded-lg text-zinc-500 hover:text-blue-400 hover:bg-blue-500/10 transition-colors"
              title="Edit Project"
            >
              <FaEdit className="text-xs" />
            </button>
            <button
              onClick={() => onDeleteGoal(goal.id)}
              className="p-1.5 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
              title="Delete Project"
            >
              <FaTrash className="text-xs" />
            </button>
          </div>
        </div>
      </div>

      {/* Subtasks (expanded) */}
      {isExpanded && (
        <div className="border-t border-zinc-800/60 px-5 py-3 space-y-1.5">
          {goal.subtasks.length === 0 ? (
            <p className="text-xs text-zinc-500 py-3 text-center">
              No subtasks yet. Add one to get started!
            </p>
          ) : (
            goal.subtasks.map((subtask) => (
              <div
                key={subtask.id}
                className={`flex items-center justify-between py-2.5 px-3 rounded-xl transition-colors ${
                  subtask.status === "Completed"
                    ? "bg-zinc-800/30 opacity-60"
                    : "bg-zinc-800/50 hover:bg-zinc-800/80"
                }`}
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  {/* Completion checkbox */}
                  <button
                    onClick={() => onCompleteSubtask(goal.id, subtask.id)}
                    className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                      subtask.status === "Completed"
                        ? "bg-emerald-500 border-emerald-500"
                        : "border-zinc-600 hover:border-emerald-500"
                    }`}
                  >
                    {subtask.status === "Completed" && (
                      <FaCheck className="text-white text-[8px]" />
                    )}
                  </button>

                  <span
                    className={`text-sm font-medium truncate ${
                      subtask.status === "Completed"
                        ? "text-zinc-500 line-through"
                        : "text-white"
                    }`}
                  >
                    {subtask.title}
                  </span>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full border ${
                      COMPLEXITY_BADGE[subtask.complexity]
                    }`}
                  >
                    {subtask.complexity}
                  </span>
                  <div className="flex items-center gap-0.5 text-zinc-500 text-[10px]">
                    <FaClock className="text-[9px]" />
                    <span>{subtask.estimatedTime}</span>
                  </div>

                  {subtask.status !== "Completed" && (
                    <div className="flex items-center gap-0.5">
                      <button
                        onClick={() => onStartSubtask(goal.id, subtask.id)}
                        className="p-1.5 rounded-lg text-emerald-400 hover:bg-emerald-500/15 transition-colors"
                        title="Start Focus"
                      >
                        <FaPlay className="text-[10px]" />
                      </button>
                      <button
                        onClick={() => onEditSubtask(goal.id, subtask)}
                        className="p-1.5 rounded-lg text-blue-400 hover:bg-blue-500/15 transition-colors"
                        title="Edit"
                      >
                        <FaEdit className="text-[10px]" />
                      </button>
                    </div>
                  )}
                  <button
                    onClick={() => onDeleteSubtask(goal.id, subtask.id)}
                    className="p-1.5 rounded-lg text-zinc-600 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                    title="Delete"
                  >
                    <FaTrash className="text-[10px]" />
                  </button>
                </div>
              </div>
            ))
          )}

          {/* Add Subtask Button */}
          <button
            onClick={() => onAddSubtask(goal.id)}
            className="flex items-center gap-2 w-full py-2.5 px-3 rounded-xl text-zinc-500 hover:text-blue-400 hover:bg-zinc-800/60 transition-colors mt-1"
          >
            <FaPlus className="text-[10px]" />
            <span className="text-xs font-semibold">Add Subtask</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default GoalCard;
