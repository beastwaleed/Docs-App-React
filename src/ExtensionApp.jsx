import React, { useState, useEffect, useCallback } from "react";
import { ThemeProvider } from "./components/ThemeContext";
import Background from "./components/Background";
import SearchBar from "./components/SearchBar";
import ShortTasks from "./components/ShortTasks";
import ShortTaskForm from "./components/ShortTaskForm";
import LongTermGoals from "./components/LongTermGoals";
import GoalForm from "./components/GoalForm";
import SubtaskForm from "./components/SubtaskForm";
import FocusTimer from "./components/FocusTimer";
import ThemeSelector from "./components/ThemeSelector";

// Helper to save to both localStorage and chrome.storage.local
const saveState = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {}
  
  if (typeof chrome !== "undefined" && chrome.storage && chrome.storage.local) {
    chrome.storage.local.set({ [key]: value });
  }
};

// Completion sound (short pleasant chime via Web Audio API)
const playCompletionSound = () => {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const playTone = (freq, startTime, duration) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = freq;
      osc.type = "sine";
      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.3, startTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
      osc.start(startTime);
      osc.stop(startTime + duration);
    };
    const now = ctx.currentTime;
    playTone(523.25, now, 0.15);       // C5
    playTone(659.25, now + 0.12, 0.15); // E5
    playTone(783.99, now + 0.24, 0.25); // G5
  } catch (e) {
    console.log("Audio not available");
  }
};

const ExtensionApp = () => {
  // ─── Short Tasks State ─────────────────────────────────────
  const [shortTasks, setShortTasks] = useState(() => {
    try {
      const saved = localStorage.getItem("taskboard_short_tasks");
      if (saved) { const parsed = JSON.parse(saved); if (Array.isArray(parsed)) return parsed; }
    } catch (e) {}
    return [];
  });

  const [showShortTaskForm, setShowShortTaskForm] = useState(false);
  const [editingShortTask, setEditingShortTask] = useState(null);

  useEffect(() => {
    saveState("taskboard_short_tasks", shortTasks);
  }, [shortTasks]);

  // Sync short tasks across tabs (localStorage & chrome.storage)
  useEffect(() => {
    const handleStorage = (e) => {
      if (e.key === "taskboard_short_tasks" && e.newValue) {
        try { setShortTasks(JSON.parse(e.newValue)); } catch (err) {}
      }
    };
    window.addEventListener("storage", handleStorage);
    
    const handleChromeStorage = (changes, namespace) => {
      if (namespace === "local" && changes.taskboard_short_tasks) {
        setShortTasks(changes.taskboard_short_tasks.newValue || []);
      }
    };
    if (typeof chrome !== "undefined" && chrome.storage) {
      chrome.storage.onChanged.addListener(handleChromeStorage);
    }
    
    return () => {
      window.removeEventListener("storage", handleStorage);
      if (typeof chrome !== "undefined" && chrome.storage) {
        chrome.storage.onChanged.removeListener(handleChromeStorage);
      }
    };
  }, []);

  // ─── Long-Term Goals State ─────────────────────────────────
  const [goals, setGoals] = useState(() => {
    try {
      const saved = localStorage.getItem("taskboard_goals");
      if (saved) { const parsed = JSON.parse(saved); if (Array.isArray(parsed)) return parsed; }
    } catch (e) {}
    return [];
  });

  const [showGoalForm, setShowGoalForm] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);
  const [showSubtaskForm, setShowSubtaskForm] = useState(false);
  const [editingSubtask, setEditingSubtask] = useState(null);
  const [subtaskGoalId, setSubtaskGoalId] = useState(null);

  useEffect(() => {
    saveState("taskboard_goals", goals);
  }, [goals]);

  // Sync goals across tabs
  useEffect(() => {
    const handleStorage = (e) => {
      if (e.key === "taskboard_goals" && e.newValue) {
        try { setGoals(JSON.parse(e.newValue)); } catch (err) {}
      }
    };
    window.addEventListener("storage", handleStorage);

    const handleChromeStorage = (changes, namespace) => {
      if (namespace === "local" && changes.taskboard_goals) {
        setGoals(changes.taskboard_goals.newValue || []);
      }
    };
    if (typeof chrome !== "undefined" && chrome.storage) {
      chrome.storage.onChanged.addListener(handleChromeStorage);
    }

    return () => {
      window.removeEventListener("storage", handleStorage);
      if (typeof chrome !== "undefined" && chrome.storage) {
        chrome.storage.onChanged.removeListener(handleChromeStorage);
      }
    };
  }, []);

  // ─── Focus Mode State ──────────────────────────────────────
  const [focusState, setFocusState] = useState(() => {
    try {
      const saved = localStorage.getItem("taskboard_focus_state");
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return {
      isActive: false,
      taskId: null,
      taskTitle: "",
      taskType: null, // "short" | "subtask"
      goalId: null,
      startedAt: null,
      pausedAt: null,
      totalPausedMs: 0,
      estimatedTime: null,
    };
  });

  useEffect(() => {
    saveState("taskboard_focus_state", focusState);
  }, [focusState]);

  // Sync focus state across tabs
  useEffect(() => {
    const handleStorage = (e) => {
      if (e.key === "taskboard_focus_state" && e.newValue) {
        try { setFocusState(JSON.parse(e.newValue)); } catch (err) {}
      }
    };
    window.addEventListener("storage", handleStorage);

    const handleChromeStorage = (changes, namespace) => {
      if (namespace === "local" && changes.taskboard_focus_state) {
        setFocusState(changes.taskboard_focus_state.newValue || {
          isActive: false, taskId: null, taskTitle: "", taskType: null, goalId: null, startedAt: null, pausedAt: null, totalPausedMs: 0, estimatedTime: null
        });
      }
    };
    if (typeof chrome !== "undefined" && chrome.storage) {
      chrome.storage.onChanged.addListener(handleChromeStorage);
    }

    return () => {
      window.removeEventListener("storage", handleStorage);
      if (typeof chrome !== "undefined" && chrome.storage) {
        chrome.storage.onChanged.removeListener(handleChromeStorage);
      }
    };
  }, []);

  // ─── Short Task Handlers ──────────────────────────────────
  const handleAddShortTask = (data) => {
    const newTask = { id: Date.now().toString(), ...data, status: "Pending", createdAt: Date.now() };
    setShortTasks((prev) => [...prev, newTask]);
    setShowShortTaskForm(false);
  };

  const handleEditShortTask = (data) => {
    setShortTasks((prev) =>
      prev.map((t) => (t.id === editingShortTask.id ? { ...t, ...data } : t))
    );
    setEditingShortTask(null);
    setShowShortTaskForm(false);
  };

  const handleDeleteShortTask = (id) => {
    setShortTasks((prev) => prev.filter((t) => t.id !== id));
    if (focusState.isActive && focusState.taskId === id) {
      handleFocusCancel();
    }
  };

  const handleCompleteShortTask = useCallback((id) => {
    setShortTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, status: t.status === "Completed" ? "Pending" : "Completed" }
          : t
      )
    );
    const task = shortTasks.find((t) => t.id === id);
    if (task && task.status !== "Completed") playCompletionSound();
    if (focusState.isActive && focusState.taskId === id) {
      handleFocusCancel();
    }
  }, [shortTasks, focusState]);

  const handleStartShortTask = (id) => {
    const task = shortTasks.find((t) => t.id === id);
    if (!task) return;
    setFocusState({
      isActive: true,
      taskId: id,
      taskTitle: task.title,
      taskType: "short",
      goalId: null,
      startedAt: Date.now(),
      pausedAt: null,
      totalPausedMs: 0,
      estimatedTime: task.estimatedTime,
    });
  };

  // ─── Long-Term Goal Handlers ──────────────────────────────
  const handleAddGoal = (data) => {
    const newGoal = { id: Date.now().toString(), ...data, subtasks: [], createdAt: Date.now() };
    setGoals((prev) => [...prev, newGoal]);
    setShowGoalForm(false);
  };

  const handleEditGoal = (data) => {
    setGoals((prev) =>
      prev.map((g) => (g.id === editingGoal.id ? { ...g, ...data } : g))
    );
    setEditingGoal(null);
    setShowGoalForm(false);
  };

  const handleDeleteGoal = (id) => {
    setGoals((prev) => prev.filter((g) => g.id !== id));
    if (focusState.isActive && focusState.goalId === id) {
      handleFocusCancel();
    }
  };

  const handleAddSubtask = (data) => {
    const newSubtask = { id: Date.now().toString(), ...data, status: "Pending" };
    setGoals((prev) =>
      prev.map((g) =>
        g.id === subtaskGoalId
          ? { ...g, subtasks: [...g.subtasks, newSubtask] }
          : g
      )
    );
    setShowSubtaskForm(false);
    setSubtaskGoalId(null);
  };

  const handleEditSubtask = (data) => {
    setGoals((prev) =>
      prev.map((g) =>
        g.id === subtaskGoalId
          ? {
              ...g,
              subtasks: g.subtasks.map((s) =>
                s.id === editingSubtask.id ? { ...s, ...data } : s
              ),
            }
          : g
      )
    );
    setEditingSubtask(null);
    setShowSubtaskForm(false);
    setSubtaskGoalId(null);
  };

  const handleDeleteSubtask = (goalId, subtaskId) => {
    setGoals((prev) =>
      prev.map((g) =>
        g.id === goalId
          ? { ...g, subtasks: g.subtasks.filter((s) => s.id !== subtaskId) }
          : g
      )
    );
    if (focusState.isActive && focusState.taskId === subtaskId) {
      handleFocusCancel();
    }
  };

  const handleCompleteSubtask = useCallback((goalId, subtaskId) => {
    let wasCompleted = false;
    setGoals((prev) =>
      prev.map((g) => {
        if (g.id !== goalId) return g;
        return {
          ...g,
          subtasks: g.subtasks.map((s) => {
            if (s.id !== subtaskId) return s;
            wasCompleted = s.status === "Completed";
            return { ...s, status: s.status === "Completed" ? "Pending" : "Completed" };
          }),
        };
      })
    );
    if (!wasCompleted) playCompletionSound();
    if (focusState.isActive && focusState.taskId === subtaskId) {
      handleFocusCancel();
    }
  }, [focusState]);

  const handleStartSubtask = (goalId, subtaskId) => {
    const goal = goals.find((g) => g.id === goalId);
    const subtask = goal?.subtasks.find((s) => s.id === subtaskId);
    if (!subtask) return;
    setFocusState({
      isActive: true,
      taskId: subtaskId,
      taskTitle: subtask.title,
      taskType: "subtask",
      goalId: goalId,
      startedAt: Date.now(),
      pausedAt: null,
      totalPausedMs: 0,
      estimatedTime: subtask.estimatedTime,
    });
  };

  // ─── Focus Timer Handlers ─────────────────────────────────
  const handleFocusPause = () => {
    setFocusState((prev) => ({ ...prev, pausedAt: Date.now() }));
  };

  const handleFocusResume = () => {
    setFocusState((prev) => {
      const pauseDuration = prev.pausedAt ? Date.now() - prev.pausedAt : 0;
      return { ...prev, pausedAt: null, totalPausedMs: prev.totalPausedMs + pauseDuration };
    });
  };

  const handleFocusComplete = () => {
    if (focusState.taskType === "short") {
      handleCompleteShortTask(focusState.taskId);
    } else if (focusState.taskType === "subtask") {
      handleCompleteSubtask(focusState.goalId, focusState.taskId);
    }
    // playCompletionSound is called inside handleComplete...
  };

  const handleFocusCancel = () => {
    setFocusState({ isActive: false, taskId: null, taskTitle: "", taskType: null, goalId: null, startedAt: null, pausedAt: null, totalPausedMs: 0, estimatedTime: null });
  };

  return (
    <ThemeProvider>
      <div className="fixed inset-0 w-screen h-screen overflow-y-auto overflow-x-hidden bg-black z-[999]">
        <Background />

        {/* Scrollable Content */}
        <div className="relative z-10 min-h-screen flex flex-col items-center py-10 space-y-8">
          {/* Search Bar & Clock */}
          <div className="w-full pt-4">
            <SearchBar />
          </div>

          {/* Short-Term Tasks */}
          <ShortTasks
            tasks={shortTasks}
            onAdd={() => { setEditingShortTask(null); setShowShortTaskForm(true); }}
            onEdit={(task) => { setEditingShortTask(task); setShowShortTaskForm(true); }}
            onDelete={handleDeleteShortTask}
            onStart={handleStartShortTask}
            onComplete={handleCompleteShortTask}
          />

          {/* Long-Term Goals */}
          <LongTermGoals
            goals={goals}
            onAddGoal={() => { setEditingGoal(null); setShowGoalForm(true); }}
            onEditGoal={(goal) => { setEditingGoal(goal); setShowGoalForm(true); }}
            onDeleteGoal={handleDeleteGoal}
            onAddSubtask={(goalId) => { setSubtaskGoalId(goalId); setEditingSubtask(null); setShowSubtaskForm(true); }}
            onEditSubtask={(goalId, subtask) => { setSubtaskGoalId(goalId); setEditingSubtask(subtask); setShowSubtaskForm(true); }}
            onDeleteSubtask={handleDeleteSubtask}
            onCompleteSubtask={handleCompleteSubtask}
            onStartSubtask={handleStartSubtask}
          />

          {/* Footer Credit */}
          <div className="pb-6 text-center">
            <a
              href="https://www.linkedin.com/in/digiwaleed"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] font-medium text-zinc-600 hover:text-zinc-400 transition-colors"
            >
              Built by Waleed
            </a>
          </div>
        </div>

        {/* Focus Timer Overlay */}
        <FocusTimer
          focusState={focusState}
          onPause={handleFocusPause}
          onResume={handleFocusResume}
          onComplete={handleFocusComplete}
          onCancel={handleFocusCancel}
        />

        {/* Theme Selector */}
        <ThemeSelector />

        {/* ── Modals ──────────────────────────────────── */}
        {showShortTaskForm && (
          <ShortTaskForm
            onSubmit={editingShortTask ? handleEditShortTask : handleAddShortTask}
            onClose={() => { setShowShortTaskForm(false); setEditingShortTask(null); }}
            editingTask={editingShortTask}
          />
        )}

        {showGoalForm && (
          <GoalForm
            onSubmit={editingGoal ? handleEditGoal : handleAddGoal}
            onClose={() => { setShowGoalForm(false); setEditingGoal(null); }}
            editingGoal={editingGoal}
          />
        )}

        {showSubtaskForm && (
          <SubtaskForm
            onSubmit={editingSubtask ? handleEditSubtask : handleAddSubtask}
            onClose={() => { setShowSubtaskForm(false); setEditingSubtask(null); setSubtaskGoalId(null); }}
            editingSubtask={editingSubtask}
          />
        )}
      </div>
    </ThemeProvider>
  );
};

export default ExtensionApp;
