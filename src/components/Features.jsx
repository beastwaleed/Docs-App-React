import React from "react";
import { FaSearch, FaHandRock, FaDatabase, FaBolt } from "react-icons/fa";

const FEATURES = [
  {
    icon: FaSearch,
    title: "Google Search & Custom Themes",
    description:
      "Search the web instantly. Personalize your canvas with built-in gradient themes, image presets, or upload your own background.",
  },
  {
    icon: FaBolt,
    title: "Short-Term Tasks & Focus Timer",
    description:
      "Add quick daily tasks with estimated times. Click start to launch a sleek floating Focus Timer widget that synchronizes across all your tabs.",
  },
  {
    icon: FaDatabase,
    title: "Long-Term Goals & Subtasks",
    description:
      "Break down ambitious projects into manageable subtasks. Track your progress with visual completion bars right on your dashboard.",
  },
  {
    icon: FaHandRock,
    title: "Instant State Synchronization",
    description:
      "Your tasks and active focus timers are saved securely on your device and instantly synchronized across all your open tabs.",
  },
];

const Features = () => {
  return (
    <section id="features" className="py-20 px-6 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <h2 className="text-xs uppercase tracking-widest font-extrabold text-zinc-500">
          Everything You Need
        </h2>
        <h3 className="text-3xl md:text-5xl font-extrabold text-zinc-900 tracking-tight">
          Supercharge Your New Tab Experience
        </h3>
        <p className="text-zinc-500 text-base md:text-lg">
          Combine powerful web search with daily tasks, deep focus timers, and long-term goal tracking on your default browser homepage.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {FEATURES.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div
              key={index}
              className="bg-white border border-zinc-200/80 rounded-2xl p-6 hover:shadow-xl hover:shadow-zinc-200/50 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div
                  className="w-12 h-12 rounded-xl bg-zinc-50 border border-zinc-100 flex items-center justify-center text-zinc-800 shadow-sm group-hover:scale-110 transition-transform"
                >
                  <Icon className="text-xl" />
                </div>
                <h4 className="text-xl font-bold text-zinc-900 tracking-tight">
                  {feature.title}
                </h4>
                <p className="text-sm text-zinc-500 leading-relaxed">
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
