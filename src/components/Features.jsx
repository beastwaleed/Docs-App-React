import React from "react";
import { FaSearch, FaHandRock, FaDatabase, FaBolt } from "react-icons/fa";

const FEATURES = [
  {
    icon: FaSearch,
    color: "from-blue-500 to-cyan-500",
    title: "Google Search with Live Autocomplete",
    description:
      "Get real-time Google search suggestions directly as you type. Type search queries or enter domain URLs to navigate instantly.",
  },
  {
    icon: FaHandRock,
    color: "from-indigo-500 to-purple-500",
    title: "Draggable Floating Task Board",
    description:
      "Organize tasks freely across your new tab canvas with fluid drag physics and built-in search bar wall collision boundaries.",
  },
  {
    icon: FaDatabase,
    color: "from-emerald-500 to-teal-500",
    title: "Instant Local Storage Persistence",
    description:
      "Your tasks are saved securely on your device. Created, completed, or deleted tasks remain in sync every time you open a new tab.",
  },
  {
    icon: FaBolt,
    color: "from-amber-500 to-orange-500",
    title: "Zero Bloat & Blazing Fast",
    description:
      "Pure React 19 & Tailwind architecture designed to load in milliseconds without any background battery or memory drain.",
  },
];

const Features = () => {
  return (
    <section id="features" className="py-20 px-6 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <h2 className="text-xs uppercase tracking-widest font-extrabold text-blue-400">
          Everything You Need
        </h2>
        <h3 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
          Supercharge Your New Tab Experience
        </h3>
        <p className="text-zinc-400 text-base md:text-lg">
          Combine powerful web search with clean, draggable task management right on your default browser homepage.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {FEATURES.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div
              key={index}
              className="bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-6 hover:border-zinc-700/80 hover:bg-zinc-900/90 transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${feature.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}
                >
                  <Icon className="text-xl" />
                </div>
                <h4 className="text-xl font-bold text-white tracking-tight">
                  {feature.title}
                </h4>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Features;
