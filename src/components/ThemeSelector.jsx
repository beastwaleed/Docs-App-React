import React, { useState, useRef } from "react";
import { FaPalette, FaTimes, FaImage, FaUpload, FaCheck } from "react-icons/fa";
import { useTheme } from "./ThemeContext";

const ThemeSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("gradients");
  const fileInputRef = useRef(null);
  const {
    theme,
    setGradient,
    setImage,
    setCustomImage,
    GRADIENT_PRESETS,
    IMAGE_PRESETS,
  } = useTheme();

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setCustomImage(ev.target.result);
    };
    reader.readAsDataURL(file);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-5 left-5 z-50 p-3 bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-700/60 rounded-full text-zinc-400 hover:text-white shadow-xl backdrop-blur-md transition-all duration-300 active:scale-95 group"
        title="Change Theme"
      >
        <FaPalette className="text-lg group-hover:rotate-12 transition-transform" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-5 left-5 z-50 w-80 max-h-[70vh] bg-zinc-900/95 backdrop-blur-2xl border border-zinc-700/60 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800/80">
        <div className="flex items-center gap-2">
          <FaPalette className="text-blue-400 text-sm" />
          <span className="text-sm font-bold text-white">Appearance</span>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="text-zinc-400 hover:text-white p-1 rounded-lg hover:bg-zinc-800 transition-colors"
        >
          <FaTimes className="text-xs" />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-zinc-800/80">
        <button
          onClick={() => setActiveTab("gradients")}
          className={`flex-1 py-2.5 text-xs font-semibold transition-colors ${
            activeTab === "gradients"
              ? "text-blue-400 border-b-2 border-blue-400"
              : "text-zinc-500 hover:text-zinc-300"
          }`}
        >
          Gradients
        </button>
        <button
          onClick={() => setActiveTab("images")}
          className={`flex-1 py-2.5 text-xs font-semibold transition-colors ${
            activeTab === "images"
              ? "text-blue-400 border-b-2 border-blue-400"
              : "text-zinc-500 hover:text-zinc-300"
          }`}
        >
          Images
        </button>
        <button
          onClick={() => setActiveTab("upload")}
          className={`flex-1 py-2.5 text-xs font-semibold transition-colors ${
            activeTab === "upload"
              ? "text-blue-400 border-b-2 border-blue-400"
              : "text-zinc-500 hover:text-zinc-300"
          }`}
        >
          Upload
        </button>
      </div>

      {/* Content */}
      <div className="overflow-y-auto p-3 flex-1">
        {/* Gradients Grid */}
        {activeTab === "gradients" && (
          <div className="grid grid-cols-2 gap-2">
            {GRADIENT_PRESETS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => setGradient(preset.id)}
                className={`relative h-16 rounded-xl bg-gradient-to-br ${preset.value} border-2 transition-all duration-200 overflow-hidden group ${
                  theme.type === "gradient" && theme.gradientId === preset.id
                    ? "border-blue-500 ring-2 ring-blue-500/30"
                    : "border-zinc-700/50 hover:border-zinc-600"
                }`}
              >
                <span className="absolute bottom-1 left-2 text-[10px] font-semibold text-white/70 group-hover:text-white/90">
                  {preset.name}
                </span>
                {theme.type === "gradient" && theme.gradientId === preset.id && (
                  <div className="absolute top-1.5 right-1.5 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                    <FaCheck className="text-white text-[8px]" />
                  </div>
                )}
              </button>
            ))}
          </div>
        )}

        {/* Image Presets Grid */}
        {activeTab === "images" && (
          <div className="grid grid-cols-2 gap-2">
            {IMAGE_PRESETS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => setImage(preset.id)}
                className={`relative h-20 rounded-xl border-2 transition-all duration-200 overflow-hidden bg-cover bg-center group ${
                  theme.type === "image" && theme.imageId === preset.id
                    ? "border-blue-500 ring-2 ring-blue-500/30"
                    : "border-zinc-700/50 hover:border-zinc-600"
                }`}
                style={{ backgroundImage: `url(${preset.url})` }}
              >
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />
                <span className="absolute bottom-1 left-2 text-[10px] font-semibold text-white/80 group-hover:text-white drop-shadow">
                  {preset.name}
                </span>
                {theme.type === "image" && theme.imageId === preset.id && (
                  <div className="absolute top-1.5 right-1.5 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center z-10">
                    <FaCheck className="text-white text-[8px]" />
                  </div>
                )}
              </button>
            ))}
          </div>
        )}

        {/* Custom Upload */}
        {activeTab === "upload" && (
          <div className="space-y-3">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full py-8 border-2 border-dashed border-zinc-700/80 rounded-xl text-zinc-400 hover:text-zinc-200 hover:border-zinc-500 transition-colors flex flex-col items-center gap-2"
            >
              <FaUpload className="text-xl" />
              <span className="text-xs font-semibold">Click to upload an image</span>
              <span className="text-[10px] text-zinc-500">JPG, PNG, or WebP</span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />

            {theme.type === "custom" && theme.customImageUrl && (
              <div className="relative h-24 rounded-xl overflow-hidden border-2 border-blue-500 ring-2 ring-blue-500/30">
                <img
                  src={theme.customImageUrl}
                  alt="Custom background"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-1.5 right-1.5 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                  <FaCheck className="text-white text-[8px]" />
                </div>
                <span className="absolute bottom-1 left-2 text-[10px] font-semibold text-white/80 drop-shadow">
                  Your Upload
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ThemeSelector;
