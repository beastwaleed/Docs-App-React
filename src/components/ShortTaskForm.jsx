import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";

const PRESET_TIMES = ["15min", "30min", "45min", "1hr", "1.5hr", "2hr", "3hr", "4hr+"];

const ShortTaskForm = ({ onSubmit, onClose, editingTask }) => {
  const initialTime = editingTask?.estimatedTime || "30min";
  const isInitialCustom = !PRESET_TIMES.includes(initialTime);

  const [formData, setFormData] = useState({
    title: editingTask?.title || "",
    complexity: editingTask?.complexity || "Medium",
    estimatedTime: isInitialCustom ? "custom" : initialTime,
  });

  const [customMinutes, setCustomMinutes] = useState(
    isInitialCustom ? initialTime.replace(/\D/g, "") : ""
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    let finalTime = formData.estimatedTime;
    if (finalTime === "custom") {
      if (!customMinutes || parseInt(customMinutes) <= 0) return;
      finalTime = `${customMinutes}min`;
    }

    onSubmit({
      ...formData,
      title: formData.title.trim(),
      estimatedTime: finalTime,
    });
  };

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-md flex justify-center items-center z-[1000] p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-zinc-900 border border-zinc-800 text-white p-6 rounded-2xl shadow-2xl space-y-5 w-full max-w-md">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <span>⚡</span> {editingTask ? "Edit Task" : "New Quick Task"}
          </h2>
          <button onClick={onClose} className="text-zinc-400 hover:text-white p-1 rounded-lg hover:bg-zinc-800 transition-colors">
            <FaTimes size="1.1em" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">Task Title</label>
            <input
              type="text"
              name="title"
              placeholder="What do you need to do today?"
              value={formData.title}
              onChange={handleChange}
              className="w-full bg-zinc-800 border border-zinc-700/80 p-3 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm"
              required
              autoFocus
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">Complexity</label>
              <select
                name="complexity"
                value={formData.complexity}
                onChange={handleChange}
                className="w-full bg-zinc-800 border border-zinc-700/80 p-2.5 rounded-xl text-white text-sm focus:outline-none focus:border-blue-500"
              >
                <option value="Low">🟢 Low</option>
                <option value="Medium">🟡 Medium</option>
                <option value="High">🔴 High</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">Estimated Time</label>
              <div className="flex gap-2">
                <select
                  name="estimatedTime"
                  value={formData.estimatedTime}
                  onChange={handleChange}
                  className="w-full bg-zinc-800 border border-zinc-700/80 p-2.5 rounded-xl text-white text-sm focus:outline-none focus:border-blue-500"
                >
                  <option value="15min">15 min</option>
                  <option value="30min">30 min</option>
                  <option value="45min">45 min</option>
                  <option value="1hr">1 hour</option>
                  <option value="1.5hr">1.5 hours</option>
                  <option value="2hr">2 hours</option>
                  <option value="3hr">3 hours</option>
                  <option value="4hr+">4+ hours</option>
                  <option value="custom">Custom...</option>
                </select>
                {formData.estimatedTime === "custom" && (
                  <input
                    type="number"
                    min="1"
                    placeholder="Mins"
                    value={customMinutes}
                    onChange={(e) => setCustomMinutes(e.target.value)}
                    className="w-20 bg-zinc-800 border border-zinc-700/80 p-2.5 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm"
                    required
                  />
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-xl text-sm font-semibold transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-semibold shadow-lg shadow-blue-600/30 transition-all active:scale-95"
            >
              {editingTask ? "Save Changes" : "Add Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShortTaskForm;
