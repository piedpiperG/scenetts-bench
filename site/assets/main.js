const footerYear = document.getElementById("footer-year");
const casesRoot = document.getElementById("cases-root");
const casesStatus = document.getElementById("cases-status");
const taskButtons = Array.from(document.querySelectorAll(".task-switch"));

if (footerYear) {
  footerYear.textContent = `${new Date().getFullYear()} SceneTTS-Bench`;
}

const CASE_SOURCES = {
  task1: "./data/task1_cases.json",
  task2: "./data/task2_cases.json",
  task3: "./data/task4_cases.json",
};

const CASE_TITLES = {
  task1: "Task 1 · Timbre Jump",
  task2: "Task 2 · Emotional Tension",
  task3: "Task 3 · Rhythm Jump",
};

const CASE_DESCRIPTIONS = {
  task1: "Each group includes the ref voice plus HIGH / MEDIUM / NORMAL utterances from the same role.",
  task2: "Only low-arousal and low-dominance under-acting examples are shown, with prompt text and three VAD statistics.",
  task3: "Each row is a prev / cur pair with an elevated rhythm discontinuity ratio.",
};

let loadedCases = null;
let activeTask = "task1";

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) {
    node.className = className;
  }
  if (text !== undefined) {
    node.textContent = text;
  }
  return node;
}

function makeMetaPills(parts) {
  const wrap = el("div", "case-pills");
  parts.filter(Boolean).forEach((part) => {
    wrap.appendChild(el("span", "case-pill", String(part)));
  });
  return wrap;
}

function makeAudioCard({ title, subtitle, text, audioPath, stats = [] }) {
  const card = el("article", "audio-card");
  card.appendChild(el("div", "audio-card-label", title));
  if (subtitle) {
    card.appendChild(el("p", "audio-card-subtitle", subtitle));
  }
  if (text) {
    card.appendChild(el("p", "audio-card-text", text));
  }
  if (audioPath) {
    const player = document.createElement("audio");
    player.className = "audio-player";
    player.controls = true;
    player.preload = "none";
    player.src = audioPath;
    card.appendChild(player);
  }
  if (stats.length) {
    card.appendChild(makeMetaPills(stats));
  }
  return card;
}

function renderTask1(groups) {
  const frag = document.createDocumentFragment();

  groups.forEach((group, index) => {
    const section = el("section", "case-group");
    section.appendChild(el("h3", "case-group-title", `Case ${index + 1}`));
    section.appendChild(makeMetaPills([group.language.toUpperCase()]));

    section.appendChild(
      makeAudioCard({
        title: "Ref Voice",
        subtitle: "Reference",
        audioPath: group.ref_demo_audio_path,
      }),
    );

    const grid = el("div", "case-grid case-grid-3");
    [["high", "HIGH"], ["medium", "MEDIUM"], ["normal", "NORMAL"]].forEach(([key, label]) => {
      const item = group.items[key];
      grid.appendChild(
        makeAudioCard({
          title: label,
          subtitle: `line ${item.line_id}`,
          audioPath: item.demo_audio_path,
        }),
      );
    });
    section.appendChild(grid);
    frag.appendChild(section);
  });

  return frag;
}

function renderTask2(groups) {
  const frag = document.createDocumentFragment();
  const byLanguage = new Map();
  groups.forEach((group) => {
    const bucket = byLanguage.get(group.language) || [];
    bucket.push(group);
    byLanguage.set(group.language, bucket);
  });

  ["zh", "en"].forEach((language) => {
    const items = byLanguage.get(language) || [];
    if (!items.length) {
      return;
    }
    const section = el("section", "case-group");
    section.appendChild(el("h3", "case-group-title", language.toUpperCase()));
    const grid = el("div", "case-grid case-grid-3");
    items.forEach((item) => {
      grid.appendChild(
        makeAudioCard({
          title: item.case_id,
          subtitle: item.category.replace("_", " "),
          text: `Prompt: ${item.instruct_text}`,
          audioPath: item.demo_audio_path,
          stats: [
            `V ${Number(item.valence).toFixed(3)}`,
            `A ${Number(item.arousal).toFixed(3)}`,
            `D ${Number(item.dominance).toFixed(3)}`,
          ],
        }),
      );
    });
    section.appendChild(grid);
    frag.appendChild(section);
  });

  return frag;
}

function renderTask3(groups) {
  const frag = document.createDocumentFragment();

  groups.forEach((group, index) => {
    const section = el("section", "case-group");
    section.appendChild(el("h3", "case-group-title", `Case ${index + 1}`));
    section.appendChild(
      makeMetaPills([
        group.language.toUpperCase(),
      ]),
    );

    const grid = el("div", "case-grid case-grid-2");
    grid.appendChild(
      makeAudioCard({
        title: "Prev",
        audioPath: group.prev.demo_audio_path,
      }),
    );
    grid.appendChild(
      makeAudioCard({
        title: "Cur",
        audioPath: group.cur.demo_audio_path,
      }),
    );
    section.appendChild(grid);
    frag.appendChild(section);
  });

  return frag;
}

function renderCases(task) {
  if (!casesRoot || !casesStatus || !loadedCases) {
    return;
  }

  const cases = loadedCases[task] || [];
  casesRoot.replaceChildren();

  const intro = el("div", "cases-intro");
  intro.appendChild(el("h3", "cases-intro-title", CASE_TITLES[task]));
  intro.appendChild(el("p", "cases-intro-text", CASE_DESCRIPTIONS[task]));
  casesRoot.appendChild(intro);

  if (!cases.length) {
    casesStatus.textContent = "No cases available.";
    return;
  }

  casesStatus.textContent = `${cases.length} curated groups loaded.`;

  if (task === "task1") {
    casesRoot.appendChild(renderTask1(cases));
    return;
  }
  if (task === "task2") {
    casesRoot.appendChild(renderTask2(cases));
    return;
  }
  casesRoot.appendChild(renderTask3(cases));
}

function setActiveTask(task) {
  activeTask = task;
  taskButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.task === task);
  });
  renderCases(task);
}

async function loadCuratedCases() {
  if (!casesStatus || !casesRoot) {
    return;
  }

  try {
    const entries = await Promise.all(
      Object.entries(CASE_SOURCES).map(async ([key, url]) => {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Failed to load ${url}`);
        }
        return [key, await response.json()];
      }),
    );
    loadedCases = Object.fromEntries(entries);
    setActiveTask(activeTask);
  } catch (error) {
    casesStatus.textContent = "Failed to load curated cases.";
    casesRoot.replaceChildren(
      makeAudioCard({
        title: "Unavailable",
        text: error instanceof Error ? error.message : "Unknown error",
      }),
    );
  }
}

taskButtons.forEach((button) => {
  button.addEventListener("click", () => setActiveTask(button.dataset.task));
});

loadCuratedCases();
