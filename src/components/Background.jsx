import React from "react";
import { useTheme } from "./ThemeContext";

const Background = () => {
  const { theme, getBackgroundStyle, getGradientClass } = useTheme();

  const isImageBg = theme.type === "image" || theme.type === "custom";

  return (
    <div
      className={`fixed inset-0 z-[1] w-full h-screen overflow-hidden select-none pointer-events-none ${
        !isImageBg ? getGradientClass() : "bg-black"
      }`}
      style={isImageBg ? getBackgroundStyle() : {}}
    >
      {/* Dark overlay for image backgrounds (readability) */}
      {isImageBg && (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px]" />
      )}

      {/* Ambient background glows (gradient mode only) */}
      {!isImageBg && (
        <>
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-600/8 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-indigo-600/8 rounded-full blur-3xl" />
        </>
      )}
    </div>
  );
};

export default Background;
