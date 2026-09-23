import React from "react";
import { FaDownload, FaFolderOpen, FaToggleOn, FaCheckCircle } from "react-icons/fa";

const STEPS = [
  {
    step: "01",
    icon: FaDownload,
    title: "Download & Extract ZIP",
    description:
      "Click 'Download ZIP' to get docs-app-extension.zip, then extract the ZIP package onto your computer.",
  },
  {
    step: "02",
    icon: FaFolderOpen,
    title: "Open chrome://extensions",
    description:
      "Open your browser (Chrome, Edge, Brave, Opera) and navigate to chrome://extensions in the address bar.",
  },
  {
    step: "03",
    icon: FaToggleOn,
    title: "Enable Developer Mode",
    description:
      "Toggle on the 'Developer Mode' switch located in the top-right corner of the Extensions page.",
  },
  {
    step: "04",
    icon: FaCheckCircle,
    title: "Click 'Load Unpacked'",
    description:
      "Click the 'Load unpacked' button, select the extracted extension folder, and open a New Tab to enjoy your new dashboard!",
  },
];

const InstallGuide = () => {
  return (
    <section id="install" className="py-20 px-6 max-w-7xl mx-auto border-t border-zinc-200/80">
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <h2 className="text-xs uppercase tracking-widest font-extrabold text-zinc-500">
          Easy Setup
        </h2>
        <h3 className="text-3xl md:text-5xl font-extrabold text-zinc-900 tracking-tight">
          How to Install in 30 Seconds
        </h3>
        <p className="text-zinc-500 text-base md:text-lg">
          No Chrome Web Store approval needed. Install unpacked in a few quick clicks.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {STEPS.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className="relative bg-white border border-zinc-200 rounded-2xl p-6 hover:shadow-lg hover:border-zinc-300 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-4xl font-black text-zinc-100">
                    {item.step}
                  </span>
                  <div className="p-3 bg-zinc-50 text-zinc-600 rounded-xl border border-zinc-200">
                    <Icon className="text-lg" />
                  </div>
                </div>
                <h4 className="text-lg font-bold text-zinc-900 mb-2">
                  {item.title}
                </h4>
                <p className="text-sm text-zinc-500 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default InstallGuide;
