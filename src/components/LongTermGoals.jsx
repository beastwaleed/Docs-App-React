import React from "react";
import { FaPlus } from "react-icons/fa";
import GoalCard from "./GoalCard";

const LongTermGoals = ({
  goals,
  onAddGoal,
  onEditGoal,
  onDeleteGoal,
  onAddSubtask,
  onEditSubtask,
  onDeleteSubtask,
  onCompleteSubtask,
  onStartSubtask,
}) => {
  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-base">🎯</span>
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">
            Long-Term Goals
          </h2>
          {goals.length > 0 && (
            <span className="text-[10px] font-bold text-zinc-400 bg-zinc-800 px-2 py-0.5 rounded-full">
              {goals.length} {goals.length === 1 ? "project" : "projects"}
            </span>
          )}
        </div>
        <button
          onClick={onAddGoal}
          className="flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-blue-300 bg-blue-500/10 hover:bg-blue-500/20 px-3 py-1.5 rounded-full border border-blue-500/20 transition-all active:scale-95"
        >
          <FaPlus className="text-[10px]" />
          <span>Add Project</span>
        </button>
      </div>

      {/* Goal Cards */}
      {goals.length === 0 ? (
        <div
          onClick={onAddGoal}
          className="w-full py-10 border-2 border-dashed border-zinc-800/80 rounded-2xl flex flex-col items-center gap-2 cursor-pointer hover:border-zinc-700 transition-colors group"
        >
          <div className="p-3 rounded-full bg-zinc-800/60 text-zinc-500 group-hover:text-blue-400 transition-colors">
            <FaPlus />
          </div>
          <p className="text-xs text-zinc-500 group-hover:text-zinc-400">
            Click to create your first long-term goal
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {goals.map((goal) => (
            <GoalCard
              key={goal.id}
              goal={goal}
              onEditGoal={onEditGoal}
              onDeleteGoal={onDeleteGoal}
              onAddSubtask={onAddSubtask}
              onEditSubtask={onEditSubtask}
              onDeleteSubtask={onDeleteSubtask}
              onCompleteSubtask={onCompleteSubtask}
              onStartSubtask={onStartSubtask}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default LongTermGoals;
