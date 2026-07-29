import React, { useState, useEffect, useRef } from "react";
import { FaSearch, FaPlus, FaTimes } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const SearchBar = ({ onOpenForm }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  const inputRef = useRef(null);
  const containerRef = useRef(null);

  // Auto-focus input on initial render
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Update clock & date
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
      setDate(
        now.toLocaleDateString(undefined, {
          weekday: "long",
          month: "short",
          day: "numeric",
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch real-time Google search suggestions using JSONP (bypasses CORS in all browser contexts)
  useEffect(() => {
    const trimmed = query.trim();
    if (!trimmed) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const timer = setTimeout(() => {
      const callbackName =
        "googleSuggestCallback_" + Math.random().toString(36).substring(7);

      const cleanup = () => {
        delete window[callbackName];
        const oldScript = document.getElementById(callbackName);
        if (oldScript) oldScript.remove();
      };

      window[callbackName] = (data) => {
        if (data && Array.isArray(data[1])) {
          // Extract text suggestions array
          const results = data[1].map((item) =>
            Array.isArray(item) ? item[0] : item
          );
          setSuggestions(results.slice(0, 8)); // Top 8 suggestions
          setShowSuggestions(true);
          setSelectedIndex(-1);
        }
        cleanup();
      };

      const script = document.createElement("script");
      script.id = callbackName;
      script.src = `https://suggestqueries.google.com/complete/search?client=chrome&q=${encodeURIComponent(
        trimmed
      )}&jsonp=${callbackName}`;
      script.onerror = cleanup;
      document.body.appendChild(script);
    }, 150);

    return () => clearTimeout(timer);
  }, [query]);

  // Check if input is a URL or domain
  const isUrl = (string) => {
    const trimmed = string.trim();
    if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
      return true;
    }
    const domainRegex = /^[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+(:\d+)?(\/.*)?$/;
    return domainRegex.test(trimmed);
  };

  const executeSearch = (searchTerm) => {
    const trimmed = searchTerm.trim();
    if (!trimmed) return;

    if (isUrl(trimmed)) {
      const targetUrl =
        trimmed.startsWith("http://") || trimmed.startsWith("https://")
          ? trimmed
          : `https://${trimmed}`;
      window.location.assign(targetUrl);
    } else {
      window.location.assign(
        `https://www.google.com/search?q=${encodeURIComponent(trimmed)}`
      );
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (selectedIndex >= 0 && suggestions[selectedIndex]) {
      executeSearch(suggestions[selectedIndex]);
    } else {
      executeSearch(query);
    }
  };

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (!showSuggestions || suggestions.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev > 0 ? prev - 1 : suggestions.length - 1
      );
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
    }
  };

  return (
    <div
      ref={containerRef}
      className="flex flex-col items-center justify-center space-y-5 text-white z-20 pointer-events-auto w-full max-w-2xl px-4"
      onDoubleClick={(e) => e.stopPropagation()}
    >
      {/* Clock & Date Header */}
      <div className="text-center select-none">
        <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight text-white/90 drop-shadow-lg">
          {time}
        </h1>
        <p className="text-sm md:text-base text-zinc-400 font-medium mt-1">
          {date}
        </p>
      </div>

      {/* Search Bar & Add Task Bar */}
      <div className="flex items-center space-x-3 w-full">
        {/* Search Input Container */}
        <div className="flex-1 relative">
          <form
            action="https://www.google.com/search"
            method="GET"
            onSubmit={handleFormSubmit}
            className="w-full flex items-center bg-zinc-900/90 backdrop-blur-2xl border border-zinc-700/80 rounded-full px-5 py-3.5 shadow-2xl focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/30 transition-all duration-200"
          >
            <FcGoogle className="text-2xl mr-3 flex-shrink-0" />
            <input
              ref={inputRef}
              type="text"
              name="q"
              placeholder="Search Google or type a URL"
              value={
                selectedIndex >= 0 && suggestions[selectedIndex]
                  ? suggestions[selectedIndex]
                  : query
              }
              onChange={(e) => {
                setQuery(e.target.value);
                setSelectedIndex(-1);
              }}
              onKeyDown={handleKeyDown}
              onFocus={() => {
                if (query.trim() && suggestions.length > 0) {
                  setShowSuggestions(true);
                }
              }}
              className="w-full bg-transparent text-white placeholder-zinc-500 focus:outline-none text-base font-medium"
              autoComplete="off"
              spellCheck="false"
            />

            {/* Clear button */}
            {query && (
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setSuggestions([]);
                  setShowSuggestions(false);
                  inputRef.current?.focus();
                }}
                className="text-zinc-500 hover:text-zinc-300 p-1 mr-2 transition-colors flex-shrink-0"
                title="Clear text"
              >
                <FaTimes className="text-sm" />
              </button>
            )}

            {/* Search button */}
            <button
              type="submit"
              className="text-zinc-400 hover:text-blue-400 transition-colors p-1 flex-shrink-0"
              title="Search Google"
            >
              <FaSearch className="text-lg" />
            </button>
          </form>

          {/* Live Search Suggestions Dropdown */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-full left-0 w-full mt-2 bg-zinc-900/95 backdrop-blur-2xl border border-zinc-700/80 rounded-2xl shadow-2xl overflow-hidden z-50 pointer-events-auto">
              <div className="py-2 divide-y divide-zinc-800/60">
                {suggestions.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => executeSearch(item)}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={`flex items-center px-5 py-3 cursor-pointer text-sm font-medium transition-colors ${
                      index === selectedIndex
                        ? "bg-blue-600/30 text-blue-300 border-l-4 border-blue-500"
                        : "text-zinc-200 hover:bg-zinc-800/70"
                    }`}
                  >
                    <FaSearch className="text-zinc-500 text-xs mr-3 flex-shrink-0" />
                    <span className="truncate">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Quick Add Task Button */}
        <button
          onClick={onOpenForm}
          className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-4 py-3.5 rounded-full font-semibold shadow-lg hover:shadow-blue-500/25 transition-all duration-300 flex-shrink-0 active:scale-95"
          title="Create New Task Card"
        >
          <FaPlus className="text-sm" />
          <span className="hidden sm:inline text-sm">Add Task</span>
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
