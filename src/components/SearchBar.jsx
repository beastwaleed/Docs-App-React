import React, { useState, useEffect, useRef } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [greeting, setGreeting] = useState("");

  const inputRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      );
      setDate(
        now.toLocaleDateString(undefined, {
          weekday: "long",
          month: "short",
          day: "numeric",
        })
      );
      const hour = now.getHours();
      if (hour < 12) setGreeting("Good Morning");
      else if (hour < 17) setGreeting("Good Afternoon");
      else setGreeting("Good Evening");
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const trimmed = query.trim();
    if (!trimmed) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    const timer = setTimeout(async () => {
      try {
        const response = await fetch(
          `https://suggestqueries.google.com/complete/search?client=firefox&q=${encodeURIComponent(trimmed)}`
        );
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data) && Array.isArray(data[1])) {
            const results = data[1].map((item) => (Array.isArray(item) ? item[0] : item));
            setSuggestions(results.slice(0, 8));
            setShowSuggestions(true);
            setSelectedIndex(-1);
            return;
          }
        }
      } catch (err) {}
      try {
        const callbackName = "gsc_" + Math.random().toString(36).substring(7);
        const cleanup = () => { delete window[callbackName]; document.getElementById(callbackName)?.remove(); };
        window[callbackName] = (data) => {
          if (data && Array.isArray(data[1])) {
            const results = data[1].map((item) => (Array.isArray(item) ? item[0] : item));
            setSuggestions(results.slice(0, 8));
            setShowSuggestions(true);
            setSelectedIndex(-1);
          }
          cleanup();
        };
        const script = document.createElement("script");
        script.id = callbackName;
        script.src = `https://suggestqueries.google.com/complete/search?client=chrome&q=${encodeURIComponent(trimmed)}&jsonp=${callbackName}`;
        script.onerror = cleanup;
        document.body.appendChild(script);
      } catch (e) {}
    }, 150);
    return () => clearTimeout(timer);
  }, [query]);

  const isUrl = (s) => {
    const t = s.trim();
    if (t.startsWith("http://") || t.startsWith("https://")) return true;
    return /^[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+(:\d+)?(\/.*)?$/.test(t);
  };

  const executeSearch = (searchTerm) => {
    const trimmed = searchTerm.trim();
    if (!trimmed) return;
    if (isUrl(trimmed)) {
      window.location.assign(trimmed.startsWith("http") ? trimmed : `https://${trimmed}`);
    } else {
      window.location.assign(`https://www.google.com/search?q=${encodeURIComponent(trimmed)}`);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    executeSearch(selectedIndex >= 0 && suggestions[selectedIndex] ? suggestions[selectedIndex] : query);
  };

  const handleKeyDown = (e) => {
    if (!showSuggestions || suggestions.length === 0) return;
    if (e.key === "ArrowDown") { e.preventDefault(); setSelectedIndex((p) => (p < suggestions.length - 1 ? p + 1 : 0)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setSelectedIndex((p) => (p > 0 ? p - 1 : suggestions.length - 1)); }
    else if (e.key === "Escape") setShowSuggestions(false);
  };

  return (
    <div
      ref={containerRef}
      className="flex flex-col items-center justify-center space-y-4 text-white z-20 w-full max-w-2xl px-4 mx-auto"
    >
      {/* Clock, Greeting & Date */}
      <div className="text-center select-none">
        <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight text-white/90 drop-shadow-lg">
          {time}
        </h1>
        <p className="text-base text-white/60 font-medium mt-1">{greeting}</p>
        <p className="text-xs text-white/40 font-medium">{date}</p>
      </div>

      {/* Search Bar */}
      <div className="w-full relative">
        <form
          onSubmit={handleFormSubmit}
          className="w-full flex items-center bg-zinc-900/70 backdrop-blur-2xl border border-zinc-700/60 rounded-full px-5 py-3.5 shadow-2xl focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/30 transition-all duration-200"
        >
          <FcGoogle className="text-2xl mr-3 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            name="q"
            placeholder="Search Google or type a URL"
            value={selectedIndex >= 0 && suggestions[selectedIndex] ? suggestions[selectedIndex] : query}
            onChange={(e) => { setQuery(e.target.value); setSelectedIndex(-1); }}
            onKeyDown={handleKeyDown}
            onFocus={() => { if (query.trim() && suggestions.length > 0) setShowSuggestions(true); }}
            className="w-full bg-transparent text-white placeholder-zinc-500 focus:outline-none text-base font-medium"
            autoComplete="off"
            spellCheck="false"
          />
          {query && (
            <button
              type="button"
              onClick={() => { setQuery(""); setSuggestions([]); setShowSuggestions(false); inputRef.current?.focus(); }}
              className="text-zinc-500 hover:text-zinc-300 p-1 mr-2 transition-colors flex-shrink-0"
            >
              <FaTimes className="text-sm" />
            </button>
          )}
          <button type="submit" className="text-zinc-400 hover:text-blue-400 transition-colors p-1 flex-shrink-0">
            <FaSearch className="text-lg" />
          </button>
        </form>

        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute top-full left-0 w-full mt-2 bg-zinc-900/95 backdrop-blur-2xl border border-zinc-700/80 rounded-2xl shadow-2xl overflow-hidden z-50">
            <div className="py-2 divide-y divide-zinc-800/60">
              {suggestions.map((item, index) => (
                <div
                  key={index}
                  onClick={() => executeSearch(item)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`flex items-center px-5 py-3 cursor-pointer text-sm font-medium transition-colors ${
                    index === selectedIndex ? "bg-blue-600/30 text-blue-300 border-l-4 border-blue-500" : "text-zinc-200 hover:bg-zinc-800/70"
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
    </div>
  );
};

export default SearchBar;
