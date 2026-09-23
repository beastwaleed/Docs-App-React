// taskboard-timer

const parseEstimatedTime = (timeStr) => {
  if (!timeStr) return 30 * 60 * 1000;
  if (timeStr.includes("min")) return parseInt(timeStr) * 60 * 1000;
  if (timeStr.includes("hr")) {
    if (timeStr === "4hr+") return 4 * 60 * 60 * 1000;
    return parseFloat(timeStr) * 60 * 60 * 1000;
  }
  return 30 * 60 * 1000;
};

let timerInterval = null;
let currentFocusState = null;

const createWidget = () => {
  const existing = document.getElementById("taskboard-timer-widget");
  if (existing) existing.remove();

  const widget = document.createElement("div");
  widget.id = "taskboard-timer-widget";
  
  widget.innerHTML = `
    <div class="tb-left">
      <div class="tb-label"><span>🎯</span><span id="tb-status">Focusing</span></div>
      <div class="tb-title" id="tb-title">Task Name</div>
    </div>
    <div class="tb-divider"></div>
    <div class="tb-time" id="tb-time">00:00</div>
    <div class="tb-divider"></div>
    <div class="tb-controls">
      <button id="tb-btn-toggle" class="tb-btn" title="Pause/Resume">
        <svg id="tb-icon-pause" viewBox="0 0 24 24" fill="currentColor"><path d="M6 4h4v16H6zm8 0h4v16h-4z"/></svg>
        <svg id="tb-icon-play" viewBox="0 0 24 24" fill="currentColor" style="display:none;"><path d="M8 5v14l11-7z"/></svg>
      </button>
      <button id="tb-btn-done" class="tb-btn tb-btn-done" title="Mark Complete">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
      </button>
      <button id="tb-btn-cancel" class="tb-btn tb-btn-cancel" title="Cancel">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
      </button>
    </div>
  `;

  document.body.appendChild(widget);

  document.getElementById("tb-btn-toggle").addEventListener("click", () => {
    if (currentFocusState.pausedAt) {
      // Resume
      const pauseDuration = Date.now() - currentFocusState.pausedAt;
      currentFocusState.pausedAt = null;
      currentFocusState.totalPausedMs += pauseDuration;
    } else {
      // Pause
      currentFocusState.pausedAt = Date.now();
    }
    chrome.storage.local.set({ taskboard_focus_state: currentFocusState });
  });

  document.getElementById("tb-btn-done").addEventListener("click", () => {
    completeTask();
  });

  document.getElementById("tb-btn-cancel").addEventListener("click", () => {
    chrome.storage.local.set({
      taskboard_focus_state: { isActive: false, taskId: null, taskTitle: "", taskType: null, goalId: null, startedAt: null, pausedAt: null, totalPausedMs: 0, estimatedTime: null }
    });
  });
};

const completeTask = () => {
  chrome.storage.local.get(["taskboard_short_tasks", "taskboard_goals"], (res) => {
    if (currentFocusState.taskType === "short") {
      let tasks = res.taskboard_short_tasks || [];
      tasks = tasks.map(t => t.id === currentFocusState.taskId ? { ...t, status: "Completed" } : t);
      chrome.storage.local.set({ taskboard_short_tasks: tasks });
    } else if (currentFocusState.taskType === "subtask") {
      let goals = res.taskboard_goals || [];
      goals = goals.map(g => {
        if (g.id !== currentFocusState.goalId) return g;
        return {
          ...g,
          subtasks: g.subtasks.map(s => s.id === currentFocusState.taskId ? { ...s, status: "Completed" } : s)
        };
      });
      chrome.storage.local.set({ taskboard_goals: goals });
    }
    
    // Clear focus state
    chrome.storage.local.set({
      taskboard_focus_state: { isActive: false, taskId: null, taskTitle: "", taskType: null, goalId: null, startedAt: null, pausedAt: null, totalPausedMs: 0, estimatedTime: null }
    });
  });
};

const updateWidget = () => {
  const widget = document.getElementById("taskboard-timer-widget");
  if (!widget) return;

  const isPaused = !!currentFocusState.pausedAt;
  
  document.getElementById("tb-title").textContent = currentFocusState.taskTitle;
  document.getElementById("tb-status").textContent = isPaused ? "Paused" : "Focusing";
  
  document.getElementById("tb-icon-pause").style.display = isPaused ? "none" : "block";
  document.getElementById("tb-icon-play").style.display = isPaused ? "block" : "none";
  
  widget.classList.toggle("tb-paused", isPaused);
  
  // Calculate time
  const totalDuration = parseEstimatedTime(currentFocusState.estimatedTime);
  const now = Date.now();
  const elapsed = now - currentFocusState.startedAt;
  const pausedMs = currentFocusState.totalPausedMs || 0;

  let currentElapsed = elapsed - pausedMs;
  if (currentFocusState.pausedAt) {
    currentElapsed -= (now - currentFocusState.pausedAt);
  }

  const remaining = Math.max(0, totalDuration - currentElapsed);
  const totalSeconds = Math.ceil(remaining / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const pad = (n) => n.toString().padStart(2, "0");

  let timeDisplay = "";
  if (hours > 0) timeDisplay = `${hours}:${pad(minutes)}:${pad(seconds)}`;
  else timeDisplay = `${pad(minutes)}:${pad(seconds)}`;

  document.getElementById("tb-time").textContent = timeDisplay;
};

const initTimer = (state) => {
  currentFocusState = state;
  if (state && state.isActive) {
    if (!document.getElementById("taskboard-timer-widget")) {
      createWidget();
    }
    updateWidget();
    if (!timerInterval) {
      timerInterval = setInterval(updateWidget, 1000);
    }
  } else {
    const widget = document.getElementById("taskboard-timer-widget");
    if (widget) widget.remove();
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
  }
};

if (typeof chrome !== "undefined" && chrome.storage && chrome.storage.local) {
  chrome.storage.local.get(["taskboard_focus_state"], (res) => {
    if (res.taskboard_focus_state) initTimer(res.taskboard_focus_state);
  });

  chrome.storage.onChanged.addListener((changes, namespace) => {
    if (namespace === "local" && changes.taskboard_focus_state) {
      initTimer(changes.taskboard_focus_state.newValue);
    }
  });
}
