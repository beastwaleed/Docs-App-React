import React, { createContext, useContext, useState, useEffect } from "react";

// Gradient presets
const GRADIENT_PRESETS = [
  { id: "midnight", name: "Midnight", value: "from-zinc-950 via-zinc-900 to-black" },
  { id: "ocean", name: "Ocean", value: "from-slate-950 via-blue-950 to-indigo-950" },
  { id: "aurora", name: "Aurora", value: "from-emerald-950 via-teal-950 to-cyan-950" },
  { id: "sunset", name: "Sunset", value: "from-rose-950 via-orange-950 to-amber-950" },
  { id: "purple-haze", name: "Purple Haze", value: "from-purple-950 via-violet-950 to-indigo-950" },
  { id: "forest", name: "Forest", value: "from-green-950 via-emerald-950 to-teal-950" },
  { id: "crimson", name: "Crimson", value: "from-red-950 via-rose-950 to-pink-950" },
  { id: "deep-space", name: "Deep Space", value: "from-gray-950 via-slate-900 to-zinc-950" },
];

// Background image presets (free unsplash URLs)
const IMAGE_PRESETS = [
  { id: "mountains", name: "Mountains", url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80" },
  { id: "stars", name: "Starry Sky", url: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1920&q=80" },
  { id: "city", name: "City Night", url: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=1920&q=80" },
  { id: "forest-img", name: "Forest", url: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=1920&q=80" },
  { id: "ocean-img", name: "Ocean", url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80" },
  { id: "northern-lights", name: "Northern Lights", url: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=1920&q=80" },
  { id: "rain", name: "Rainy Window", url: "https://images.unsplash.com/photo-1515694346937-94d85e41e93e?w=1920&q=80" },
  { id: "snow", name: "Snow Peaks", url: "https://images.unsplash.com/photo-1491002052546-bf38f186af56?w=1920&q=80" },
];

const DEFAULT_THEME = {
  type: "gradient", // "gradient" | "image" | "custom"
  gradientId: "midnight",
  imageId: null,
  customImageUrl: null,
};

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem("taskboard_theme");
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error("Failed to load theme", e);
    }
    return DEFAULT_THEME;
  });

  useEffect(() => {
    try {
      localStorage.setItem("taskboard_theme", JSON.stringify(theme));
    } catch (e) {
      console.error("Failed to save theme", e);
    }
  }, [theme]);

  const setGradient = (gradientId) => {
    setTheme({ type: "gradient", gradientId, imageId: null, customImageUrl: null });
  };

  const setImage = (imageId) => {
    setTheme({ type: "image", gradientId: null, imageId, customImageUrl: null });
  };

  const setCustomImage = (url) => {
    setTheme({ type: "custom", gradientId: null, imageId: null, customImageUrl: url });
  };

  // Resolve the current background style
  const getBackgroundStyle = () => {
    if (theme.type === "image") {
      const preset = IMAGE_PRESETS.find((p) => p.id === theme.imageId);
      if (preset) return { backgroundImage: `url(${preset.url})`, backgroundSize: "cover", backgroundPosition: "center" };
    }
    if (theme.type === "custom" && theme.customImageUrl) {
      return { backgroundImage: `url(${theme.customImageUrl})`, backgroundSize: "cover", backgroundPosition: "center" };
    }
    return {};
  };

  const getGradientClass = () => {
    if (theme.type === "gradient") {
      const preset = GRADIENT_PRESETS.find((p) => p.id === theme.gradientId);
      return preset ? `bg-gradient-to-br ${preset.value}` : "bg-gradient-to-br from-zinc-950 via-zinc-900 to-black";
    }
    return "";
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setGradient,
        setImage,
        setCustomImage,
        getBackgroundStyle,
        getGradientClass,
        GRADIENT_PRESETS,
        IMAGE_PRESETS,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
