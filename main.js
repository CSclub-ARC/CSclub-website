// terminal.js

// Grab elements from the page (DOM)
const screen = document.getElementById("screen");
const form = document.getElementById("terminalForm");
const input = document.getElementById("terminalInput");

// Simple terminal state (like "memory" for this session)
const state = {
  history: [],
  historyIndex: 0,
};

// Helper: print a line to the terminal screen
function printLine(text, className = "") {
  const p = document.createElement("p");
  p.className = `terminal__line ${className}`.trim();
  p.textContent = text;
  screen.appendChild(p);
  // Auto-scroll to the bottom after printing
  screen.scrollTop = screen.scrollHeight;
}

// Helper: show the user's command as a prompt line
function echoCommand(cmd) {
  printLine(`arc@csclub:~$ ${cmd}`, "dim");
}

// Command handlers live here
const commands = {
  help() {
    printLine("Available commands:", "success");
    printLine("  help           - show this menu");
    printLine("  about          - what is ARC CS Club?");
    printLine("  events         - show upcoming meeting info");
    printLine("  discord        - show Discord invite ");
    printLine("  projects       - show project categories");
    printLine("  clear          - clear the screen");
    printLine("  echo <text>    - repeat what you type");
  },

  about() {
    printLine("ARC Computer Science Club", "success");
    printLine("We build projects, learn together, and help members level up in CS.");
  },

  events() {
    // You can change this to real info later
    printLine("Meetings:", "success");
    printLine("• Weekly meeting — STEM 307 on Wednesdays 4:30 - 5:30PM.");
    printLine("• Bring a laptop if you can. Beginners welcome.");
  },

  discord() {
    printLine("Discord:", "success");
    printLine("Paste this link into your search bar:");
    printLine("https://discord.gg/B74Ts3rUxy");
  },

  projects() {
    printLine("Project tracks:", "success");
    printLine("• Club website (HTML/CSS/JS)");
    printLine("• Game Jam (Unity/Unreal)");
  },

  clear() {
    screen.innerHTML = "";
  },

  echo(args) {
    if (!args.trim()) {
      printLine("Usage: echo <text>", "error");
      return;
    }
    printLine(args);
  },
};

// Parse and run a command line like: "echo hello world"
function runCommand(raw) {
  const line = raw.trim();
  if (!line) return;

  // Split into: command + the rest (args)
  const [cmd, ...rest] = line.split(" ");
  const args = rest.join(" ");

  const handler = commands[cmd.toLowerCase()];
  if (!handler) {
    printLine(`Command not found: ${cmd}. Type 'help'.`, "error");
    return;
  }

  // Some commands need args; we pass args always (extra ignored)
  handler(args);
}

// Intro text
printLine("Welcome to ARC CS Club Terminal", "success");
printLine("Type 'help' to see commands.");
printLine("");

// Submit event: user presses Enter
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const value = input.value;
  if (!value.trim()) return;

  // Save to history
  state.history.push(value);
  state.historyIndex = state.history.length;

  // Show what they typed, then run it
  echoCommand(value);
  runCommand(value);

  // Clear input
  input.value = "";
});

// Bonus: command history with ArrowUp / ArrowDown
input.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp") {
    e.preventDefault();
    if (state.history.length === 0) return;
    state.historyIndex = Math.max(0, state.historyIndex - 1);
    input.value = state.history[state.historyIndex] ?? "";
  }

  if (e.key === "ArrowDown") {
    e.preventDefault();
    if (state.history.length === 0) return;
    state.historyIndex = Math.min(state.history.length, state.historyIndex + 1);
    input.value = state.history[state.historyIndex] ?? "";
  }
});