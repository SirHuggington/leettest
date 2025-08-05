document.addEventListener("DOMContentLoaded", () => {
  let score = 0, clickPower = 1, autoRate = 0;
  const scoreEl = document.getElementById("score");
  const clickBtn = document.getElementById("clickBtn");
  const upgradeClickBtn = document.getElementById("upgradeClickBtn");
  const upgradeAutoBtn = document.getElementById("upgradeAutoBtn");
  const breakBtn = document.getElementById("breakBtn");
  const fixBtn = document.getElementById("fixBtn");
  const overlayBox = document.getElementById("overlayBox");
  const overlayContent = document.getElementById("overlayContent");
  const closeOverlay = document.getElementById("closeOverlay");

  const costs = { click: 10, auto: 50 };

  function updateUI() {
    scoreEl.textContent = score;
    upgradeClickBtn.textContent = `Upgrade Click (×2) - Cost: ${costs.click}`;
    upgradeAutoBtn.textContent = `Hire Intern (+1/s) - Cost: ${costs.auto}`;
  }

  clickBtn.onclick = () => { score += clickPower; updateUI(); };
  upgradeClickBtn.onclick = () => {
    if (score >= costs.click) {
      score -= costs.click;
      clickPower *= 2;
      costs.click *= 2;
      updateUI();
    }
  };
  upgradeAutoBtn.onclick = () => {
    if (score >= costs.auto) {
      score -= costs.auto;
      autoRate += 1;
      costs.auto *= 2;
      updateUI();
    }
  };

  // Passive generation
  setInterval(() => {
    score += autoRate;
    if (autoRate) updateUI();
  }, 1000);

  // Overlays
  window.showOverlay = (type) => {
    const text = {
      html: "HTML defines structure — elements and buttons appear here.",
      css: "CSS styles layout, color, spacing. External CSS keeps design consistent.",
      js: "JavaScript controls game behavior: logic, interactivity, upgrades. External javascript keeps things managable."
    };
    overlayContent.textContent = text[type];
    overlayBox.classList.remove("hidden");
  };
  closeOverlay.onclick = () => overlayBox.classList.add("hidden");

  // Break & Fix
  breakBtn.onclick = () => {
    document.getElementById("externalCSS").remove();
    document.querySelectorAll("button").forEach(btn => btn.style = "margin:0;padding:0");
    breakBtn.disabled = true;
    fixBtn.disabled = false;
    alert("🛑 Structure broken: styling wiped!");
  };
  fixBtn.onclick = () => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "style.css";
    link.id = "externalCSS";
    document.head.appendChild(link);
    document.querySelectorAll("button").forEach(btn => btn.removeAttribute("style"));
    breakBtn.disabled = false;
    fixBtn.disabled = true;
    updateUI();
  };

  // Initial UI update
  updateUI();
});
