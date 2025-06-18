const ACCESS_PIN = "5959";

const pinOverlay = document.getElementById("pin-overlay");
const pinInput = document.getElementById("pin-input");
const pinSubmit = document.getElementById("pin-submit");
const pinError = document.getElementById("pin-error");

const app = document.getElementById("app");
const navButtons = document.querySelectorAll("nav button");
const contentSections = document.querySelectorAll(".content-section");

const signalForm = document.getElementById("signal-form");
const signalInput = document.getElementById("signal-input");
const signalMessages = document.getElementById("signal-messages");

// PIN validation
pinSubmit.addEventListener("click", verifyPin);
pinInput.addEventListener("keydown", e => {
  if (e.key === "Enter") {
    verifyPin();
  }
});

function verifyPin() {
  if (pinInput.value.trim() === ACCESS_PIN) {
    showApp();
  } else {
    pinError.textContent = "Incorrect PIN. Try again.";
    pinInput.value = "";
    pinInput.focus();
  }
}

function showApp() {
  pinOverlay.style.display = "none";
  app.classList.remove("hidden");
  app.setAttribute("aria-hidden", "false");
  // Show default section
  setActiveSection("robots");
}

// Navigation
navButtons.forEach(btn =>
  btn.addEventListener("click", () => {
    setActiveSection(btn.dataset.section);
  })
);

function setActiveSection(id) {
  contentSections.forEach(section => {
    section.classList.toggle("active", section.id === id);
  });
  navButtons.forEach(btn => {
    btn.setAttribute("aria-current", btn.dataset.section === id ? "page" : "false");
  });
}

// Forex signal messages array in-memory
let signals = [
  "EUR/USD BUY at 1.1250 TP 1.1300 SL 1.1220",
  "GBP/USD SELL at 1.2650 TP 1.2550 SL 1.2690",
];

function renderSignals() {
  signalMessages.innerHTML = "";
  signals.forEach(text => {
    const li = document.createElement("li");
    li.textContent = text;
    signalMessages.appendChild(li);
  });
  signalMessages.scrollTop = signalMessages.scrollHeight;
}

// Signal form submission
signalForm.addEventListener("submit", e => {
  e.preventDefault();
  const text = signalInput.value.trim();
  if (!text) return;
  signals.push(text);
  signalInput.value = "";
  renderSignals();
});

// Initial render
renderSignals();
