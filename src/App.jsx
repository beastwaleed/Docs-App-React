import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import InstallGuide from "./components/InstallGuide";
import Footer from "./components/Footer";
import { FaTimes } from "react-icons/fa";

const PRESET_CARDS = [
  {
    id: "preset-1",
    description:
      "🚀 Welcome to your New Tab Dashboard! Drag this card anywhere on your screen.",
    complexity: "Low",
    status: "Completed",
  },
  {
    id: "preset-2",
    description:
      "💡 Double-click anywhere or click '+ Add Task' near the Google Search bar to create new tasks.",
    complexity: "Medium",
    status: "Pending",
  },
  {
    id: "preset-3",
    description:
      "🔍 Search the web instantly with real-time Google suggestions using the central Search bar.",
    complexity: "High",
    status: "Pending",
  },
];

const App = () => {
  // Load cards for live demo
  const [cards, setCards] = useState(() => {
    try {
      const saved = localStorage.getItem("docs_app_cards");
      if (saved !== null) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    } catch (e) {
      console.error("Failed to load cards from localStorage", e);
    }
    return PRESET_CARDS;
  });

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    description: "",
    complexity: "Medium",
    status: "Pending",
  });

  // Save live demo cards to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("docs_app_cards", JSON.stringify(cards));
    } catch (e) {
      console.error("Failed to save cards to localStorage", e);
    }
  }, [cards]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.description.trim()) return;

    const newCard = {
      id: Date.now().toString(),
      description: formData.description.trim(),
      complexity: formData.complexity || "Medium",
      status: formData.status || "Pending",
    };

    setCards((prev) => [newCard, ...prev]);
    setFormData({ description: "", complexity: "Medium", status: "Pending" });
    setShowForm(false);
  };

  const toggleStatus = (id) => {
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === id
          ? {
              ...card,
              status: card.status === "Completed" ? "Pending" : "Completed",
            }
          : card
      )
    );
  };

  const deleteCard = (id) => {
    setCards((prevCards) => prevCards.filter((card) => card.id !== id));
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-blue-500 selection:text-white">
      {/* Top Navbar */}
      <Navbar />

      {/* Hero Section with Interactive Live Demo */}
      <Hero
        cards={cards}
        toggleStatus={toggleStatus}
        deleteCard={deleteCard}
        onOpenForm={() => setShowForm(true)}
      />

      {/* Features Grid */}
      <Features />

      {/* How to Install Walkthrough */}
      <InstallGuide />

      {/* Footer */}
      <Footer />

      {/* Modal Popup Form for Creating New Task */}
      {showForm && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-md flex justify-center items-center z-[100] p-4"
          onDoubleClick={(e) => e.stopPropagation()}
        >
          <div className="bg-zinc-900 border border-zinc-800 text-white p-6 rounded-2xl shadow-2xl space-y-5 w-full max-w-md animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span>📝</span> Add New Task
              </h2>
              <button
                onClick={() => setShowForm(false)}
                className="text-zinc-400 hover:text-white p-1 rounded-lg hover:bg-zinc-800 transition-colors"
              >
                <FaTimes size="1.1em" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">
                  Task Description
                </label>
                <textarea
                  name="description"
                  placeholder="Enter task details..."
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  className="w-full bg-zinc-800 border border-zinc-700/80 p-3 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm resize-none"
                  required
                  autoFocus
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">
                    Complexity
                  </label>
                  <select
                    name="complexity"
                    value={formData.complexity}
                    onChange={handleChange}
                    className="w-full bg-zinc-800 border border-zinc-700/80 p-2.5 rounded-xl text-white text-sm focus:outline-none focus:border-blue-500"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full bg-zinc-800 border border-zinc-700/80 p-2.5 rounded-xl text-white text-sm focus:outline-none focus:border-blue-500"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-xl text-sm font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-semibold shadow-lg shadow-blue-600/30 transition-all active:scale-95"
                >
                  Create Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
