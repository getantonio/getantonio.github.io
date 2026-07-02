const audio = document.querySelector("#sampleAudio");
const playerPanel = document.querySelector("#sample");
const playButton = document.querySelector("#playButton");
const loopPicker = document.querySelector("#loopPicker");
const loopTrigger = document.querySelector("#loopTrigger");
const loopWheel = document.querySelector("#loopWheel");
const selectedLoop = document.querySelector("#selectedLoop");
const previousLoop = document.querySelector("#previousLoop");
const nextLoop = document.querySelector("#nextLoop");
const modeButtons = [...document.querySelectorAll(".mode-toggle button")];
const voiceSelect = document.querySelector("#voiceSelect");
const voiceStatus = document.querySelector("#voiceStatus");
const volumeDownButton = document.querySelector("#volumeDownButton");
const volumeControl = document.querySelector("#volumeControl");
const volumeUpButton = document.querySelector("#volumeUpButton");
const speedDownButton = document.querySelector("#speedDownButton");
const speedControl = document.querySelector("#speedControl");
const speedValue = document.querySelector("#speedValue");
const speedUpButton = document.querySelector("#speedUpButton");
const pitchToggle = document.querySelector("#pitchToggle");
const pitchValue = document.querySelector("#pitchValue");
const shuffleButton = document.querySelector("#shuffleButton");
const repeatModeButton = document.querySelector("#repeatModeButton");
const repeatModeLabel = document.querySelector("#repeatModeLabel");
const nextButton = document.querySelector("#nextButton");
const playlistSelect = document.querySelector("#playlistSelect");
const createPlaylistButton = document.querySelector("#createPlaylistButton");
const fileLoader = document.querySelector("#fileLoader");
const playlistEditor = document.querySelector("#playlistEditor");
const playlistTitle = document.querySelector("#playlistTitle");
const playlistCount = document.querySelector("#playlistCount");
const playlistCategory = document.querySelector("#playlistCategory");
const mainCategoryTabs = document.querySelector("#mainCategoryTabs");
const selectAllButton = document.querySelector("#selectAllButton");
const randomCountInput = document.querySelector("#randomCountInput");
const randomSelectionButton = document.querySelector("#randomSelectionButton");
const pageRail = document.querySelector(".page-rail");
const pageDots = [...document.querySelectorAll(".page-dots span")];
const openPlaylistButton = document.querySelector("#openPlaylistButton");
const openPlayerButton = document.querySelector("#openPlayerButton");
const consoleMeter = document.querySelector(".console-meter");
const previewAudio = new Audio();
const PLAYLIST_STORAGE_KEY = "sound-a-tude-playlists-v2";
const VOICE_STORAGE_KEY = "sound-a-tude-voice-v1";
const PLAYBACK_STORAGE_KEY = "sound-a-tude-playback-v1";
const METER_BAR_COUNT = 56;

const choices = {
  loop: [
    { title: "Attitude & Effort", file: "assets/audio/positive_affirmations1.mp3", phraseId: "sat-p021" },
    { title: "Negative Thoughts to Positive Action", file: "assets/audio/positive_affirmations2.mp3", phraseId: "sat-p042" },
    { title: "I Show Up Anyway", file: "assets/audio/positive_affirmations3.mp3", phraseId: "sat-p032" },
    { title: "Mistakes Help Me Grow", file: "assets/audio/positive_affirmations4.mp3", phraseId: "sat-p004" },
    { title: "I Can Try Again", file: "assets/audio/positive_affirmations5.mp3", phraseId: "sat-p018" },
    { title: "Focus and Discipline", file: "assets/audio/positive_affirmations6.mp3", phraseId: "sat-p006" },
    { title: "Confidence Before a Challenge", file: "assets/audio/positive_affirmations7.mp3", phraseId: "sat-p024" },
    { title: "Big or Small, I Give My Best", file: "assets/audio/positive_affirmations8.mp3", phraseId: "sat-p031" },
    { title: "Calm Effort", file: "assets/audio/attitude-effort-sample.mp3", phraseId: "sat-p009" },
    { title: "Morning Mindset Reset", file: "assets/audio/attitude-effort-sample.mp3", phraseId: "sat-p041" },
  ],
  conversation: [
    { title: "Attitude Check-In", file: "assets/audio/attitude-effort-sample.mp3", phraseId: "sat-p021" },
    { title: "Thought to Action Talk", file: "assets/audio/attitude-effort-sample.mp3", phraseId: "sat-p042" },
    { title: "Show Up Conversation", file: "assets/audio/attitude-effort-sample.mp3", phraseId: "sat-p032" },
    { title: "Mistake Reset", file: "assets/audio/attitude-effort-sample.mp3", phraseId: "sat-p004" },
    { title: "Try Again Talk", file: "assets/audio/attitude-effort-sample.mp3", phraseId: "sat-p018" },
    { title: "Focus Conversation", file: "assets/audio/attitude-effort-sample.mp3", phraseId: "sat-p006" },
    { title: "Before the Challenge", file: "assets/audio/attitude-effort-sample.mp3", phraseId: "sat-p024" },
    { title: "Give My Best Talk", file: "assets/audio/attitude-effort-sample.mp3", phraseId: "sat-p031" },
    { title: "Calm Effort Conversation", file: "assets/audio/attitude-effort-sample.mp3", phraseId: "sat-p009" },
    { title: "Morning Reset Conversation", file: "assets/audio/attitude-effort-sample.mp3", phraseId: "sat-p041" },
  ],
};

const phraseIds = Object.freeze(Array.from({ length: 51 }, (_, index) => (
  `sat-p${String(index + 1).padStart(3, "0")}`
)));

const phraseLibrary = [
  ["sat-p001", "Ready starts with one honest rep."],
  ["sat-p002", "Name the thought, then take the next step."],
  ["sat-p003", "Showing up counts before feeling ready."],
  ["sat-p004", "A mistake is feedback, not a final answer."],
  ["sat-p005", "Try again, smaller and steadier."],
  ["sat-p006", "Bring your attention back to one thing."],
  ["sat-p007", "Confidence grows while you move."],
  ["sat-p008", "Your best can be quiet and still count."],
  ["sat-p009", "Calm effort is still strong effort."],
  ["sat-p010", "Start with the next right action."],
  ["sat-p011", "I choose a positive attitude and steady effort in everything I do."],
  ["sat-p012", "My attitude shapes my direction, and my effort moves me forward."],
  ["sat-p013", "I meet challenges with patience, focus, and consistent effort."],
  ["sat-p014", "I can control my attitude, and I can strengthen my effort."],
  ["sat-p015", "Every day, I bring a willing attitude and give my best effort."],
  ["sat-p016", "I grow when I stay optimistic and keep working."],
  ["sat-p017", "My effort matters, especially when things feel difficult."],
  ["sat-p018", "I face setbacks with a strong attitude and the courage to try again."],
  ["sat-p019", "I am proud of the effort I give and the mindset I build."],
  ["sat-p020", "With the right attitude and honest effort, I can keep improving."],
  ["sat-p021", "I approach all challenges with a positive attitude and always apply my best effort to every task, big or small."],
  ["sat-p022", "I approach every challenge with a positive attitude and give my best effort to each task, big or small."],
  ["sat-p023", "I bring a strong attitude and steady effort to everything I do, even when the work is difficult."],
  ["sat-p024", "I choose to face challenges with confidence, patience, and my very best effort."],
  ["sat-p025", "I apply myself fully to every task and keep a positive attitude from start to finish."],
  ["sat-p026", "I meet obstacles with a hopeful mindset and the effort needed to keep moving forward."],
  ["sat-p027", "I give my best effort in all that I do and trust that my attitude helps me grow."],
  ["sat-p028", "I approach each responsibility with focus, positivity, and a willingness to work hard."],
  ["sat-p029", "I stay positive through challenges and put honest effort into every step I take."],
  ["sat-p030", "I bring determination, patience, and my best effort to every opportunity before me."],
  ["sat-p031", "I face big and small tasks with a positive attitude, strong effort, and a commitment to improve."],
  ["sat-p032", "I show up with a positive attitude and give my full effort, no matter how simple or challenging the task may be."],
  ["sat-p033", "I believe in my ability to improve, and I put effort into every step with a confident attitude."],
  ["sat-p034", "I bring energy, focus, and a positive mindset to each challenge I face."],
  ["sat-p035", "I give my best effort with a willing heart and a determined attitude."],
  ["sat-p036", "I choose to stay positive, work hard, and keep trying until I grow stronger."],
  ["sat-p037", "I approach every task with purpose, patience, and the effort needed to succeed."],
  ["sat-p038", "I turn challenges into opportunities by keeping a strong attitude and giving steady effort."],
  ["sat-p039", "I am capable of great progress when I combine a positive mindset with consistent effort."],
  ["sat-p040", "I take pride in showing up, staying focused, and giving my best in all I do."],
  ["sat-p041", "I meet each day with optimism, determination, and the effort to become better than I was yesterday."],
  ["sat-p042", "I can turn negative thoughts into a positive attitude and meet each task with earnest effort."],
  ["sat-p043", "When doubt appears, I choose a hopeful mindset and give my best effort anyway."],
  ["sat-p044", "I release discouraging thoughts and replace them with patience, confidence, and steady effort."],
  ["sat-p045", "I have the power to shift my mindset and approach challenges with honest effort."],
  ["sat-p046", "When my thoughts feel heavy, I choose positivity and take one strong step forward."],
  ["sat-p047", "I transform frustration into focus and bring sincere effort to whatever is in front of me."],
  ["sat-p048", "I do not have to believe every negative thought; I can choose a better attitude and keep trying."],
  ["sat-p049", "I turn I cannot into I will try, and I support that choice with real effort."],
  ["sat-p050", "I meet negative thoughts with courage, a positive attitude, and the willingness to do my best."],
  ["sat-p051", "I can change my inner voice, strengthen my attitude, and give earnest effort one moment at a time."],
];

const phraseDisplayTitles = [
  "Ready Starts",
  "Name The Thought",
  "Show Up Anyway",
  "Mistakes Are Feedback",
  "Try Again Smaller",
  "One Thing",
  "Confidence Grows",
  "Quiet Best",
  "Calm Effort",
  "Next Right Action",
  "Positive Attitude",
  "Direction And Effort",
  "Patient Focus",
  "Strengthen Effort",
  "Willing Attitude",
  "Stay Optimistic",
  "Effort Matters",
  "Strong Setback",
  "Proud Effort",
  "Keep Improving",
  "Best Effort",
  "Every Challenge",
  "Strong And Steady",
  "Confidence And Patience",
  "Finish Positive",
  "Keep Moving",
  "Trust The Effort",
  "Focus And Positivity",
  "Honest Effort",
  "Determination",
  "Big Or Small",
  "Show Up Fully",
  "Believe And Improve",
  "Energy And Focus",
  "Willing Heart",
  "Keep Trying",
  "Purpose And Patience",
  "Challenges To Opportunity",
  "Great Progress",
  "Take Pride",
  "Better Than Yesterday",
  "Thoughts To Effort",
  "Doubt To Hope",
  "Release Discouragement",
  "Shift Mindset",
  "One Strong Step",
  "Frustration To Focus",
  "Choose Better",
  "I Will Try",
  "Courage And Effort",
  "Change Inner Voice",
];

const phraseSubcategories = [
  {
    id: "readiness",
    title: "Readiness & next action",
    phraseIds: phraseIds.slice(0, 10),
  },
  {
    id: "attitude-foundation",
    title: "Attitude foundation",
    phraseIds: phraseIds.slice(10, 20),
  },
  {
    id: "challenge-response",
    title: "Challenge response",
    phraseIds: phraseIds.slice(20, 31),
  },
  {
    id: "showing-up",
    title: "Showing up & growth",
    phraseIds: phraseIds.slice(31, 41),
  },
  {
    id: "thought-reset",
    title: "Thought reset",
    phraseIds: phraseIds.slice(41, 51),
  },
];
const phraseSubcategoryByPhraseId = new Map(
  phraseSubcategories.flatMap((subcategory) => (
    subcategory.phraseIds.map((phraseId) => [phraseId, subcategory])
  ))
);

function slugifyPhraseTitle(value) {
  return value
    .toLowerCase()
    .replace(/\bi\b/g, "")
    .replace(/\bmy\b/g, "")
    .replace(/\bthe\b/g, "")
    .replace(/\ba\b/g, "")
    .replace(/\ban\b/g, "")
    .replace(/\bcannot\b/g, "cant")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .split("-")
    .filter(Boolean)
    .slice(0, 4)
    .join("-");
}

function attitudeEffortHandle(index, title) {
  return `ae-${String(index + 1).padStart(4, "0")}-${slugifyPhraseTitle(title)}`;
}

const sourceCutGroups = [
  { trackId: "sat-l001", title: "Attitude & Effort", count: 11 },
  { trackId: "sat-l002", title: "Negative to Action", count: 7 },
  { trackId: "sat-l003", title: "Show Up", count: 10 },
  { trackId: "sat-l004", title: "Mistakes Grow", count: 11 },
  { trackId: "sat-l005", title: "Try Again", count: 4 },
  { trackId: "sat-l006", title: "Focus", count: 11 },
  { trackId: "sat-l009", title: "Calm Effort Source", count: 30 },
];

const sourceCutChoices = sourceCutGroups.flatMap((group) => (
  Array.from({ length: group.count }, (_, index) => {
    const cutNumber = String(index + 1).padStart(3, "0");
    return {
      id: `loop-source-${group.trackId}-cut-${cutNumber}`,
      title: `${group.title} cut ${index + 1}`,
      file: `assets/audio/voices/source-mp3-v001/${group.trackId}-source-mp3-v001-cut-${cutNumber}.mp3`,
      source: "source-cut",
    };
  })
));

const brianPhraseFiles = Object.fromEntries(
  phraseIds.map((phraseId) => {
    return [
      phraseId,
      `assets/audio/voices/brian-v001/${phraseId}-brian-v001-take-v001-norm.mp3`,
    ];
  })
);

const phraseLibraryChoices = phraseLibrary.map(([phraseId, title], index) => ({
  id: `loop-phrase-${phraseId}`,
  title: attitudeEffortHandle(index, title),
  displayTitle: phraseDisplayTitles[index],
  phraseText: title,
  file: brianPhraseFiles[phraseId],
  phraseId,
  category: "Attitude & Effort",
  subcategory: phraseSubcategoryByPhraseId.get(phraseId)?.title ?? "Attitude & Effort",
  subcategoryId: phraseSubcategoryByPhraseId.get(phraseId)?.id ?? "attitude-effort",
  source: "phrase-library",
}));
const phraseLibraryChoiceIds = phraseLibraryChoices.map((choice) => choice.id);
const phraseLibraryByPhraseId = new Map(phraseLibraryChoices.map((choice) => [choice.phraseId, choice]));

function phraseChoiceIdsForPhraseIds(ids) {
  return ids.map((phraseId) => `loop-phrase-${phraseId}`);
}

const categorySampleSets = {
  "calm-focus": [
    "sat-p006",
    "sat-p009",
    "sat-p013",
    "sat-p025",
    "sat-p028",
    "sat-p037",
    "sat-p045",
    "sat-p047",
  ],
  "confidence-courage": [
    "sat-p007",
    "sat-p018",
    "sat-p024",
    "sat-p030",
    "sat-p033",
    "sat-p038",
    "sat-p043",
    "sat-p050",
  ],
};

const mainCategories = [
  { id: "attitude-effort", title: "Attitude & Effort", playlistId: "loop-phrase-library" },
  { id: "calm-focus", title: "Calm & Focus", playlistId: "loop-calm-focus-sample" },
  { id: "confidence-courage", title: "Confidence & Courage", playlistId: "loop-confidence-courage-sample" },
];

function displayTitleForChoice(choice) {
  const phraseChoice = choice.phraseId ? phraseLibraryByPhraseId.get(choice.phraseId) : null;
  return phraseChoice?.displayTitle ?? choice.displayTitle ?? choice.title;
}

const kokoroAmericanVoices = [
  { id: "af_alloy", label: "Alloy", shortLabel: "Alloy", group: "Female" },
  { id: "af_aoede", label: "Aoede", shortLabel: "Aoede", group: "Female" },
  { id: "af_bella", label: "Bella", shortLabel: "Bella", group: "Female" },
  { id: "af_heart", label: "Heart", shortLabel: "Heart", group: "Female" },
  { id: "af_jessica", label: "Jessica", shortLabel: "Jessica", group: "Female" },
  { id: "af_kore", label: "Kore", shortLabel: "Kore", group: "Female" },
  { id: "af_nicole", label: "Nicole", shortLabel: "Nicole", group: "Female" },
  { id: "af_nova", label: "Nova", shortLabel: "Nova", group: "Female" },
  { id: "af_river", label: "River", shortLabel: "River", group: "Female" },
  { id: "af_sarah", label: "Sarah", shortLabel: "Sarah", group: "Female" },
  { id: "af_sky", label: "Sky", shortLabel: "Sky", group: "Female" },
  { id: "am_adam", label: "Adam", shortLabel: "Adam", group: "Male" },
  { id: "am_echo", label: "Echo", shortLabel: "Echo", group: "Male" },
  { id: "am_eric", label: "Eric", shortLabel: "Eric", group: "Male" },
  { id: "am_fenrir", label: "Fenrir", shortLabel: "Fenrir", group: "Male" },
  { id: "am_liam", label: "Liam", shortLabel: "Liam", group: "Male" },
  { id: "am_michael", label: "Michael", shortLabel: "Michael", group: "Male" },
  { id: "am_onyx", label: "Onyx", shortLabel: "Onyx", group: "Male" },
  { id: "am_puck", label: "Puck", shortLabel: "Puck", group: "Male" },
  { id: "am_santa", label: "Santa", shortLabel: "Santa", group: "Male" },
];

const coreVoiceAliases = [
  { id: "core-mara-v001", label: "Mara.", shortLabel: "Mara.", group: "Core", sourceVoiceId: "af_nicole" },
  { id: "core-theo-v001", label: "Theo.", shortLabel: "Theo.", group: "Core", sourceVoiceId: "am_michael" },
];

function kokoroFilesByPhrase(voiceId) {
  return Object.fromEntries(phraseIds.map((phraseId) => [
    phraseId,
    `assets/audio/voices/kokoro-${voiceId}-v001/${phraseId}-kokoro-${voiceId}-v001-take-v001.mp3`,
  ]));
}

const voiceOptions = [
  ...coreVoiceAliases.map((voice) => ({
    id: voice.id,
    label: voice.label,
    shortLabel: voice.shortLabel,
    group: voice.group,
    status: "ready",
    filesByPhrase: kokoroFilesByPhrase(voice.sourceVoiceId),
  })),
  ...kokoroAmericanVoices.map((voice) => ({
    id: `kokoro-${voice.id}-v001`,
    label: voice.label,
    shortLabel: voice.shortLabel,
    group: voice.group,
    status: "ready",
    filesByPhrase: kokoroFilesByPhrase(voice.id),
  })),
];

let currentMode = "loop";
let activeVoiceId = localStorage.getItem(VOICE_STORAGE_KEY) || voiceOptions[0].id;
let selectedIndexByMode = {
  loop: 0,
  conversation: 0,
};
Object.entries(choices).forEach(([mode, modeChoices]) => {
  modeChoices.forEach((choice, index) => {
    choice.id = `${mode}-starter-${index}`;
    choice.source = "starter";
  });
});
choices.loop.push(...phraseLibraryChoices, ...sourceCutChoices);

let activePlaylistIdByMode = {
  loop: "loop-starter",
  conversation: "conversation-starter",
};
let playlistsByMode = {
  loop: [
    {
      id: "loop-starter",
      name: "Starter 10",
      category: "Attitude & Effort",
      itemIds: choices.loop.filter((choice) => choice.source === "starter").map((choice) => choice.id),
    },
    {
      id: "loop-source-cuts",
      name: "Source cuts review",
      category: "Attitude & Effort",
      itemIds: sourceCutChoices.map((choice) => choice.id),
    },
    {
      id: "loop-phrase-library",
      name: "All 51",
      category: "Attitude & Effort",
      itemIds: phraseLibraryChoices.map((choice) => choice.id),
    },
    {
      id: "loop-calm-focus-sample",
      name: "Calm Focus 8",
      category: "Calm & Focus",
      itemIds: phraseChoiceIdsForPhraseIds(categorySampleSets["calm-focus"]),
    },
    {
      id: "loop-confidence-courage-sample",
      name: "Confidence 8",
      category: "Confidence & Courage",
      itemIds: phraseChoiceIdsForPhraseIds(categorySampleSets["confidence-courage"]),
    },
  ],
  conversation: [
    {
      id: "conversation-starter",
      name: "Starter talks",
      category: "Attitude & Effort",
      itemIds: choices.conversation.map((choice) => choice.id),
    },
  ],
};
const builtInPlaylistsByMode = {
  loop: playlistsByMode.loop.map((playlist) => ({ ...playlist, itemIds: [...playlist.itemIds] })),
  conversation: playlistsByMode.conversation.map((playlist) => ({ ...playlist, itemIds: [...playlist.itemIds] })),
};
let loopOptions = [];
let scrollFrame = null;
let scrollSettleTimer = null;
let activePageIndex = 0;
let repeatMode = "all";
let shuffleEnabled = false;
let pitchPreserved = true;
let previewingId = null;
let audioContext = null;
let analyser = null;
let meterSource = null;
let meterData = null;
let meterFrame = null;
let meterBars = [];
let meterLevels = [];

loadSavedPlaylistConfiguration();
ensureBuiltInPlaylists();

function currentChoices() {
  return currentPlaylist().itemIds
    .map((itemId) => findChoice(itemId))
    .filter(Boolean);
}

function currentPlaylist() {
  const playlists = playlistsByMode[currentMode];
  return playlists.find((playlist) => playlist.id === activePlaylistIdByMode[currentMode]) ?? playlists[0];
}

function findChoice(itemId) {
  return choices[currentMode].find((choice) => choice.id === itemId);
}

function escapeHTML(value) {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#39;",
  }[character]));
}

function activeVoice() {
  return voiceOptions.find((voice) => voice.id === activeVoiceId) ?? voiceOptions[0];
}

function resolveAudioSource(choice) {
  const voice = activeVoice();
  const voiceFile = choice.phraseId ? voice.filesByPhrase[choice.phraseId] : null;

  return {
    file: voiceFile || choice.file,
    isVoiceFile: Boolean(voiceFile),
    voice,
  };
}

function updateVoiceStatus(choice = currentChoices()[selectedIndexByMode[currentMode]]) {
  if (!voiceStatus || !choice) return;

  const { isVoiceFile, voice } = resolveAudioSource(choice);
  voiceStatus.classList.toggle("is-pending", !isVoiceFile);

  if (isVoiceFile) {
    voiceStatus.textContent = `${voice.shortLabel} ready`;
    return;
  }

  voiceStatus.textContent = choice.phraseId ? `${voice.shortLabel} not rendered` : "Source audio";
}

function renderVoiceOptions() {
  if (!voiceSelect) return;

  const validVoiceIds = new Set(voiceOptions.map((voice) => voice.id));
  if (!validVoiceIds.has(activeVoiceId)) {
    activeVoiceId = voiceOptions[0].id;
    localStorage.setItem(VOICE_STORAGE_KEY, activeVoiceId);
  }

  const voiceGroups = ["Core", "Female", "Male", "Binary"].map((group) => ({
    group,
    voices: voiceOptions.filter((voice) => voice.group === group),
  })).filter(({ voices }) => voices.length);

  voiceSelect.innerHTML = voiceGroups
    .map(({ group, voices }) => (
      `<optgroup label="${escapeHTML(group)}">` +
      voices.map((voice) => {
        const selected = voice.id === activeVoiceId ? " selected" : "";
        return `<option value="${voice.id}"${selected}>${escapeHTML(voice.label)}</option>`;
      }).join("") +
      "</optgroup>"
    ))
    .join("");
}

function setVoice(voiceId) {
  const shouldResume = !audio.paused;

  activeVoiceId = voiceOptions.some((voice) => voice.id === voiceId) ? voiceId : voiceOptions[0].id;
  localStorage.setItem(VOICE_STORAGE_KEY, activeVoiceId);
  syncSelection({ scrollBehavior: "auto", updateAudio: true });

  if (shouldResume) {
    audio.currentTime = 0;
    audio.play().catch(() => setPlayingState(false));
  }
}

function loadSavedPlaylistConfiguration() {
  try {
    const savedState = JSON.parse(localStorage.getItem(PLAYLIST_STORAGE_KEY));
    if (!savedState) return;

    ["loop", "conversation"].forEach((mode) => {
      const validIds = new Set(choices[mode].map((choice) => choice.id));
      const savedPlaylists = savedState.playlistsByMode?.[mode];
      if (!Array.isArray(savedPlaylists)) return;

      const normalizedPlaylists = savedPlaylists
        .map((playlist) => ({
          id: typeof playlist.id === "string" ? playlist.id : `${mode}-custom-${Date.now()}`,
          name: typeof playlist.name === "string" && playlist.name.trim() ? playlist.name.trim() : "Playlist",
          category: typeof playlist.category === "string" && playlist.category.trim() ? playlist.category.trim() : "Attitude & Effort",
          itemIds: Array.isArray(playlist.itemIds)
            ? playlist.itemIds.filter((itemId) => validIds.has(itemId))
            : [],
        }))
        .filter((playlist) => playlist.itemIds.length);

      if (!normalizedPlaylists.length) return;

      playlistsByMode[mode] = normalizedPlaylists;
      activePlaylistIdByMode[mode] = normalizedPlaylists.some((playlist) => playlist.id === savedState.activePlaylistIdByMode?.[mode])
        ? savedState.activePlaylistIdByMode[mode]
        : normalizedPlaylists[0].id;
    });
  } catch {
    localStorage.removeItem(PLAYLIST_STORAGE_KEY);
  }
}

function ensureBuiltInPlaylists() {
  ["loop", "conversation"].forEach((mode) => {
    const existingIds = new Set(playlistsByMode[mode].map((playlist) => playlist.id));

    builtInPlaylistsByMode[mode].forEach((playlist) => {
      if (existingIds.has(playlist.id)) {
        const existingPlaylist = playlistsByMode[mode].find((candidate) => candidate.id === playlist.id);
        existingPlaylist.name = playlist.name;
        existingPlaylist.category = playlist.category;
        existingPlaylist.itemIds = [...playlist.itemIds];
        return;
      }
      playlistsByMode[mode].push({ ...playlist, itemIds: [...playlist.itemIds] });
    });

    if (!playlistsByMode[mode].some((playlist) => playlist.id === activePlaylistIdByMode[mode])) {
      activePlaylistIdByMode[mode] = playlistsByMode[mode][0].id;
    }
  });
}

function savePlaylistConfiguration() {
  const savedPlaylists = {};

  ["loop", "conversation"].forEach((mode) => {
    const persistentIds = new Set(choices[mode].filter((choice) => choice.source !== "loaded").map((choice) => choice.id));
    savedPlaylists[mode] = playlistsByMode[mode]
      .map((playlist) => ({
        id: playlist.id,
        name: playlist.name,
        category: playlist.category,
        itemIds: playlist.itemIds.filter((itemId) => persistentIds.has(itemId)),
      }))
      .filter((playlist) => playlist.itemIds.length);
  });

  localStorage.setItem(PLAYLIST_STORAGE_KEY, JSON.stringify({
    activePlaylistIdByMode,
    playlistsByMode: savedPlaylists,
  }));
}

function clampSelectedIndex() {
  const optionCount = currentChoices().length;
  selectedIndexByMode[currentMode] = Math.min(Math.max(selectedIndexByMode[currentMode], 0), optionCount - 1);
}

function updateVolume() {
  audio.volume = Number(volumeControl.value) / 100;
  previewAudio.volume = audio.volume;
}

updateVolume();

function adjustVolume(delta) {
  volumeControl.value = String(clamp(Number(volumeControl.value) + delta, 0, 100));
  updateVolume();
}

function setPreservesPitch(media, shouldPreserve) {
  media.preservesPitch = shouldPreserve;
  media.mozPreservesPitch = shouldPreserve;
  media.webkitPreservesPitch = shouldPreserve;
}

function savePlaybackTuning() {
  localStorage.setItem(PLAYBACK_STORAGE_KEY, JSON.stringify({
    speed: Number(speedControl.value),
    pitchPreserved,
  }));
}

function applyPlaybackTuningToMedia(media, speed) {
  media.playbackRate = speed;
  setPreservesPitch(media, pitchPreserved);
}

function updatePlaybackTuning({ save = true } = {}) {
  const speed = Number(speedControl.value) / 100;

  applyPlaybackTuningToMedia(audio, speed);
  applyPlaybackTuningToMedia(previewAudio, speed);

  speedValue.textContent = `${speed.toFixed(2)}x`;
  pitchValue.textContent = pitchPreserved ? "Steady" : "Natural";
  pitchToggle.classList.toggle("is-active", pitchPreserved);
  pitchToggle.setAttribute("aria-pressed", String(pitchPreserved));
  pitchToggle.setAttribute("aria-label", pitchPreserved ? "Pitch steady" : "Pitch natural");

  if (save) {
    savePlaybackTuning();
  }
}

function loadPlaybackTuning() {
  try {
    const savedTuning = JSON.parse(localStorage.getItem(PLAYBACK_STORAGE_KEY));
    if (!savedTuning) return;

    if (Number.isFinite(savedTuning.speed)) {
      speedControl.value = String(Math.min(Math.max(savedTuning.speed, 75), 125));
    }

    if (typeof savedTuning.pitchPreserved === "boolean") {
      pitchPreserved = savedTuning.pitchPreserved;
    }
  } catch {
    localStorage.removeItem(PLAYBACK_STORAGE_KEY);
  }
}

function togglePitchMode() {
  pitchPreserved = !pitchPreserved;
  updatePlaybackTuning();
}

function adjustSpeed(delta) {
  speedControl.value = String(clamp(Number(speedControl.value) + delta, 75, 125));
  updatePlaybackTuning();
}

loadPlaybackTuning();
updatePlaybackTuning({ save: false });

function idleMeterLevel(index) {
  const phase = (index / METER_BAR_COUNT) * Math.PI * 4;
  return 0.08 + Math.pow(Math.sin(phase) * 0.5 + 0.5, 2) * 0.08;
}

function renderAudioMeter() {
  if (!consoleMeter) return;

  consoleMeter.style.setProperty("--meter-bars", METER_BAR_COUNT);
  meterLevels = Array.from({ length: METER_BAR_COUNT }, (_, index) => idleMeterLevel(index));
  consoleMeter.innerHTML = meterLevels
    .map((level) => `<span style="--level: ${level.toFixed(3)}"></span>`)
    .join("");
  meterBars = [...consoleMeter.querySelectorAll("span")];
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function primeAudioMeter() {
  if (!consoleMeter || !window.AudioContext && !window.webkitAudioContext) return;

  try {
    if (!audioContext) {
      const AudioContextConstructor = window.AudioContext || window.webkitAudioContext;
      audioContext = new AudioContextConstructor();
      analyser = audioContext.createAnalyser();
      analyser.fftSize = 2048;
      analyser.smoothingTimeConstant = 0.68;
      meterData = new Uint8Array(analyser.fftSize);
      meterSource = audioContext.createMediaElementSource(audio);
      meterSource.connect(analyser);
      analyser.connect(audioContext.destination);
    }

    if (audioContext.state === "suspended") {
      audioContext.resume();
    }
  } catch {
    return;
  }

  startMeterAnimation();
}

function startMeterAnimation() {
  if (meterFrame || !meterBars.length) return;
  meterFrame = requestAnimationFrame(updateAudioMeter);
}

function updateAudioMeter() {
  const hasLiveAudio = analyser && meterData && !audio.paused && !audio.ended;
  const time = performance.now() / 1000;

  if (hasLiveAudio) {
    analyser.getByteTimeDomainData(meterData);
  }

  let highestLevel = 0;
  const samplesPerBar = meterData ? Math.max(1, Math.floor(meterData.length / METER_BAR_COUNT)) : 1;

  meterBars.forEach((bar, index) => {
    let nextLevel = idleMeterLevel(index + time * 0.45);

    if (hasLiveAudio) {
      let sum = 0;
      const sampleStart = index * samplesPerBar;
      const sampleEnd = Math.min(sampleStart + samplesPerBar, meterData.length);

      for (let sampleIndex = sampleStart; sampleIndex < sampleEnd; sampleIndex += 1) {
        const centeredSample = (meterData[sampleIndex] - 128) / 128;
        sum += centeredSample * centeredSample;
      }

      const rms = Math.sqrt(sum / Math.max(sampleEnd - sampleStart, 1));
      nextLevel = clamp(0.08 + rms * 4.8, 0.08, 1);
    }

    const previousLevel = meterLevels[index] ?? nextLevel;
    const smoothing = nextLevel > previousLevel ? 0.56 : 0.2;
    const smoothedLevel = previousLevel + (nextLevel - previousLevel) * smoothing;

    meterLevels[index] = smoothedLevel;
    highestLevel = Math.max(highestLevel, smoothedLevel);
    bar.style.setProperty("--level", smoothedLevel.toFixed(3));
  });

  if (hasLiveAudio || highestLevel > 0.18) {
    meterFrame = requestAnimationFrame(updateAudioMeter);
    return;
  }

  meterFrame = null;
}

function setPlayingState(isPlaying) {
  playerPanel.classList.toggle("is-playing", isPlaying);
  playButton.classList.toggle("is-playing", isPlaying);
  playButton.setAttribute("aria-label", isPlaying ? "Stop" : "Play");
  if (isPlaying) {
    startMeterAnimation();
  }
}

function applyAudioLooping() {
  audio.loop = repeatMode === "single";
}

function updateQueueButtons() {
  const repeatCopy = {
    once: { label: "", name: "Play once", isLooping: false },
    single: { label: "1", name: "Loop one", isLooping: true },
    all: { label: "", name: "Loop all", isLooping: true },
  }[repeatMode];

  repeatModeLabel.textContent = repeatCopy.label;
  repeatModeButton.classList.toggle("is-active", repeatCopy.isLooping);
  repeatModeButton.dataset.repeatMode = repeatMode;
  repeatModeButton.setAttribute("aria-label", repeatCopy.name);
  repeatModeButton.setAttribute("aria-pressed", String(repeatCopy.isLooping));
  shuffleButton.classList.toggle("is-active", shuffleEnabled);
  shuffleButton.setAttribute("aria-pressed", String(shuffleEnabled));
}

function cycleRepeatMode() {
  const repeatModes = ["once", "single", "all"];
  const currentIndex = repeatModes.indexOf(repeatMode);
  repeatMode = repeatModes[(currentIndex + 1) % repeatModes.length];
  applyAudioLooping();
  updateQueueButtons();
}

function toggleShuffle() {
  shuffleEnabled = !shuffleEnabled;
  updateQueueButtons();
}

function updatePageDots() {
  pageDots.forEach((dot, index) => {
    dot.classList.toggle("is-active", index === activePageIndex);
  });
}

function goToPage(pageIndex) {
  activePageIndex = Math.min(Math.max(pageIndex, 0), pageDots.length - 1);
  pageRail.style.setProperty("--page-index", activePageIndex);
  updatePageDots();
}

function centerSelectedOption(behavior = "smooth") {
  const selectedOption = loopOptions.find((option) => option.getAttribute("aria-selected") === "true");
  selectedOption?.scrollIntoView({ block: "center", behavior });
}

function selectLoop(option) {
  const shouldResume = !audio.paused;

  selectedIndexByMode[currentMode] = Number(option.dataset.index);
  syncSelection({ scrollBehavior: "smooth", updateAudio: true });

  if (shouldResume) {
    audio.currentTime = 0;
    audio.play().catch(() => setPlayingState(false));
  }
}

function renderWheel() {
  const activeChoices = currentChoices();
  loopWheel.setAttribute("aria-label", currentMode === "loop" ? "Select loop" : "Select conversation");
  loopWheel.innerHTML = activeChoices
    .map((choice, index) => {
      const selected = index === selectedIndexByMode[currentMode] ? ' aria-selected="true"' : "";
      const displayTitle = displayTitleForChoice(choice);
      return `<button type="button" role="option"${selected} data-index="${index}" data-title="${escapeHTML(displayTitle)}">${escapeHTML(displayTitle)}</button>`;
    })
    .join("");

  loopOptions = [...loopWheel.querySelectorAll("button")];
  syncSelection({ scrollBehavior: "auto" });
}

function syncSelection({ scrollBehavior = "auto", center = true, updateAudio = true } = {}) {
  clampSelectedIndex();
  const activeChoices = currentChoices();
  const selectedIndex = selectedIndexByMode[currentMode];
  const selectedChoice = activeChoices[selectedIndex];

  loopOptions.forEach((loopOption) => {
    loopOption.setAttribute("aria-selected", String(Number(loopOption.dataset.index) === selectedIndex));
  });

  selectedLoop.textContent = displayTitleForChoice(selectedChoice);
  if (updateAudio) {
    updateAudioSource(resolveAudioSource(selectedChoice).file);
  }
  updateVoiceStatus(selectedChoice);
  applyAudioLooping();
  updateLoopNeighbors();
  if (center) {
    requestAnimationFrame(() => centerSelectedOption(scrollBehavior));
  }
}

function updateSelectionFromScroll({ updateAudio = false } = {}) {
  if (!loopOptions.length) return;

  const wheelCenter = loopWheel.getBoundingClientRect().top + loopWheel.clientHeight / 2;
  let closestOption = loopOptions[0];
  let closestDistance = Number.POSITIVE_INFINITY;

  loopOptions.forEach((option) => {
    const rect = option.getBoundingClientRect();
    const optionCenter = rect.top + rect.height / 2;
    const distance = Math.abs(optionCenter - wheelCenter);

    if (distance < closestDistance) {
      closestDistance = distance;
      closestOption = option;
    }
  });

  const nextIndex = Number(closestOption.dataset.index);
  const didChange = selectedIndexByMode[currentMode] !== nextIndex;
  selectedIndexByMode[currentMode] = nextIndex;

  syncSelection({
    center: false,
    updateAudio,
  });
}

function updateAudioSource(file) {
  if (audio.getAttribute("src") === file) {
    updatePlaybackTuning({ save: false });
    return;
  }

  audio.setAttribute("src", file);
  audio.load();
  updatePlaybackTuning({ save: false });
}

function updateLoopNeighbors() {
  const activeChoices = currentChoices();
  const selectedIndex = selectedIndexByMode[currentMode];
  const optionCount = activeChoices.length;
  const previousIndex = (selectedIndex - 1 + optionCount) % optionCount;
  const nextIndex = (selectedIndex + 1) % optionCount;

  previousLoop.textContent = displayTitleForChoice(activeChoices[previousIndex]);
  nextLoop.textContent = displayTitleForChoice(activeChoices[nextIndex]);
}

function setMode(mode) {
  if (mode === currentMode) return;

  currentMode = mode;
  audio.pause();
  audio.currentTime = 0;
  setPlayingState(false);
  stopPreview();
  applyAudioLooping();

  modeButtons.forEach((button) => {
    const isSelected = button.dataset.mode === currentMode;
    button.classList.toggle("is-selected", isSelected);
    button.setAttribute("aria-pressed", String(isSelected));
  });

  renderWheel();
  renderPlaylistEditor();
  renderPlaylistControls();
}

function nextQueuedIndex() {
  const optionCount = currentChoices().length;
  const currentIndex = selectedIndexByMode[currentMode];

  if (shuffleEnabled && optionCount > 1) {
    let nextIndex = currentIndex;
    while (nextIndex === currentIndex) {
      nextIndex = Math.floor(Math.random() * optionCount);
    }
    return nextIndex;
  }

  return (currentIndex + 1) % optionCount;
}

function renderPlaylistControls() {
  const playlists = playlistsByMode[currentMode];
  playlistSelect.innerHTML = playlists
    .map((playlist) => {
      const selected = playlist.id === currentPlaylist().id ? " selected" : "";
      return `<option value="${playlist.id}"${selected}>${escapeHTML(playlist.name)}</option>`;
    })
    .join("");
}

function renderMainCategoryTabs() {
  if (!mainCategoryTabs) return;

  const activePlaylist = currentPlaylist();
  mainCategoryTabs.innerHTML = mainCategories.map((category) => {
    const isActive = activePlaylist.id === category.playlistId || activePlaylist.category === category.title;
    return `
      <button
        type="button"
        data-category-id="${escapeHTML(category.id)}"
        class="${isActive ? "is-active" : ""}"
        aria-pressed="${isActive}"
      >${escapeHTML(category.title)}</button>
    `;
  }).join("");
}

function describePlaylistChoice(choice) {
  const phraseChoice = choice.phraseId ? phraseLibraryByPhraseId.get(choice.phraseId) : null;
  const subcategory = choice.phraseId ? phraseSubcategoryByPhraseId.get(choice.phraseId) : null;

  if (phraseChoice) {
    return {
      label: phraseChoice.displayTitle,
      description: phraseChoice.phraseText,
      meta: `${phraseChoice.title} - ${subcategory?.title ?? "Attitude & Effort"}`,
      groupId: subcategory?.id ?? "attitude-effort",
      groupTitle: subcategory?.title ?? "Attitude & Effort",
    };
  }

  if (choice.source === "source-cut") {
    return {
      label: choice.title,
      description: choice.title,
      meta: "Source cuts",
      groupId: "source-cuts",
      groupTitle: "Source cuts",
    };
  }

  if (choice.source === "loaded") {
    return {
      label: choice.title,
      description: choice.title,
      meta: "Loaded files",
      groupId: "loaded-files",
      groupTitle: "Loaded files",
    };
  }

  return {
    label: choice.title,
    description: choice.phraseText ?? choice.title,
    meta: currentMode === "conversation" ? "Conversation starters" : "Other",
    groupId: currentMode === "conversation" ? "conversation" : "other",
    groupTitle: currentMode === "conversation" ? "Conversation starters" : "Other",
  };
}

function choicesByPlaylistId() {
  return new Map(choices[currentMode].map((choice) => [choice.id, choice]));
}

function availableChoicesForPlaylist(activePlaylist) {
  const activeSet = new Set(activePlaylist.itemIds);
  const choicesById = choicesByPlaylistId();
  const activePhraseIds = new Set(
    activePlaylist.itemIds
      .map((itemId) => choicesById.get(itemId)?.phraseId)
      .filter(Boolean)
  );

  return choices[currentMode].filter((choice) => {
    if (activeSet.has(choice.id)) return false;
    if (choice.phraseId && activePhraseIds.has(choice.phraseId)) return false;
    if (choice.source === "starter" && phraseLibraryByPhraseId.has(choice.phraseId)) return false;
    if (choice.source === "source-cut" && activePlaylist.id !== "loop-source-cuts") return false;
    return true;
  });
}

function groupedPlaylistChoices(items) {
  const groupsById = new Map();

  items.forEach((choice) => {
    const description = describePlaylistChoice(choice);
    if (!groupsById.has(description.groupId)) {
      groupsById.set(description.groupId, {
        id: description.groupId,
        title: description.groupTitle,
        items: [],
      });
    }
    groupsById.get(description.groupId).items.push(choice);
  });

  const groupOrder = [
    ...phraseSubcategories.map((subcategory) => subcategory.id),
    "source-cuts",
    "loaded-files",
    "conversation",
    "other",
  ];

  return [...groupsById.values()].sort((a, b) => {
    const aIndex = groupOrder.indexOf(a.id);
    const bIndex = groupOrder.indexOf(b.id);
    return (aIndex < 0 ? 999 : aIndex) - (bIndex < 0 ? 999 : bIndex);
  });
}

function renderPlaylistTrack(choice, activePlaylist, activeSet) {
  const isIncluded = activeSet.has(choice.id);
  const isLastIncluded = isIncluded && activePlaylist.itemIds.length === 1;
  const isPreviewing = previewingId === choice.id;
  const description = describePlaylistChoice(choice);

  return `
    <div class="playlist-track${isIncluded ? " is-included" : ""}" data-item-id="${choice.id}">
      <button class="playlist-preview" type="button" aria-label="${isPreviewing ? "Stop" : "Play"} ${escapeHTML(description.label)}">
        <span class="${isPreviewing ? "stop-mini-icon" : "play-mini-icon"}" aria-hidden="true"></span>
      </button>
      <div class="playlist-track-copy" title="${escapeHTML(description.description)}">
        <span>${escapeHTML(description.label)}</span>
        <em>${escapeHTML(description.meta)}</em>
      </div>
      <button
        class="playlist-membership"
        type="button"
        aria-label="${isIncluded ? "Remove" : "Add"} ${escapeHTML(description.label)}"
        aria-pressed="${isIncluded}"
        ${isLastIncluded ? "disabled" : ""}
      >
        ${isIncluded ? "−" : "+"}
      </button>
    </div>
  `;
}

function renderPlaylistSection(group, activePlaylist, activeSet, { addable = false } = {}) {
  const canAddGroup = addable && phraseSubcategories.some((subcategory) => subcategory.id === group.id);
  const addButton = canAddGroup && group.items.length
    ? `<button class="playlist-section-add" type="button" data-add-group="${escapeHTML(group.id)}" aria-label="Add ${escapeHTML(group.title)} to mix">Add</button>`
    : "";

  return `
    <section class="playlist-section" data-group-id="${escapeHTML(group.id)}">
      <div class="playlist-section-head">
        <span>${escapeHTML(group.title)}</span>
        <em>${group.items.length}</em>
        ${addButton}
      </div>
      ${group.items.map((choice) => renderPlaylistTrack(choice, activePlaylist, activeSet)).join("")}
    </section>
  `;
}

function renderPlaylistEditor() {
  const activePlaylist = currentPlaylist();
  const activeSet = new Set(activePlaylist.itemIds);
  const choicesById = choicesByPlaylistId();
  const selectedChoices = activePlaylist.itemIds.map((itemId) => choicesById.get(itemId)).filter(Boolean);
  const availableGroups = groupedPlaylistChoices(availableChoicesForPlaylist(activePlaylist));
  const selectedSection = {
    id: "in-mix",
    title: "In this mix",
    items: selectedChoices,
  };

  playlistCategory.textContent = activePlaylist.category ?? "Attitude & Effort";
  playlistTitle.textContent = activePlaylist.name;
  playlistCount.textContent = `${activePlaylist.itemIds.length} file${activePlaylist.itemIds.length === 1 ? "" : "s"}`;
  renderMainCategoryTabs();
  playlistEditor.innerHTML = [
    renderPlaylistSection(selectedSection, activePlaylist, activeSet),
    ...availableGroups.map((group) => renderPlaylistSection(group, activePlaylist, activeSet, { addable: true })),
  ].join("");
}

function togglePlaylistItem(itemId) {
  const activePlaylist = currentPlaylist();
  const isIncluded = activePlaylist.itemIds.includes(itemId);

  if (isIncluded && activePlaylist.itemIds.length === 1) {
    return;
  }

  const selectedItemId = activePlaylist.itemIds[selectedIndexByMode[currentMode]];
  const wasPlaying = !audio.paused;
  const wasPreviewingRemovedItem = previewingId === itemId;

  if (isIncluded) {
    activePlaylist.itemIds = activePlaylist.itemIds.filter((activeItemId) => activeItemId !== itemId);
  } else {
    activePlaylist.itemIds = [...activePlaylist.itemIds, itemId];
  }

  if (wasPreviewingRemovedItem) {
    stopPreview();
  }

  const nextSelectedIndex = activePlaylist.itemIds.indexOf(selectedItemId);
  selectedIndexByMode[currentMode] = nextSelectedIndex >= 0 ? nextSelectedIndex : 0;

  renderWheel();
  renderPlaylistEditor();
  savePlaylistConfiguration();

  if (wasPlaying) {
    audio.currentTime = 0;
    audio.play().catch(() => setPlayingState(false));
  }
}

function addPlaylistGroup(groupId) {
  const activePlaylist = currentPlaylist();
  const additions = availableChoicesForPlaylist(activePlaylist)
    .filter((choice) => describePlaylistChoice(choice).groupId === groupId)
    .map((choice) => choice.id);

  if (!additions.length) return;

  activePlaylist.itemIds = [...activePlaylist.itemIds, ...additions];
  renderPlaylistControls();
  renderWheel();
  renderPlaylistEditor();
  savePlaylistConfiguration();
}

function createPlaylist() {
  const playlists = playlistsByMode[currentMode];
  const playlistNumber = playlists.length + 1;
  const prefix = currentMode === "loop" ? "Loop" : "Conversation";
  const firstChoice = currentChoices()[selectedIndexByMode[currentMode]] ?? choices[currentMode][0];
  const playlist = {
    id: `${currentMode}-custom-${Date.now()}`,
    name: `${prefix} playlist ${playlistNumber}`,
    category: "Attitude & Effort",
    itemIds: firstChoice ? [firstChoice.id] : [],
  };

  playlists.push(playlist);
  activePlaylistIdByMode[currentMode] = playlist.id;
  selectedIndexByMode[currentMode] = 0;
  stopPreview();
  renderPlaylistControls();
  renderWheel();
  renderPlaylistEditor();
  savePlaylistConfiguration();
}

function switchPlaylist(playlistId) {
  activePlaylistIdByMode[currentMode] = playlistId;
  selectedIndexByMode[currentMode] = 0;
  stopPreview();
  renderWheel();
  renderPlaylistEditor();
  savePlaylistConfiguration();
}

function activateLoopPlaylist(playlistId) {
  if (currentMode !== "loop") {
    setMode("loop");
  }

  activePlaylistIdByMode.loop = playlistId;
  selectedIndexByMode.loop = 0;
  renderPlaylistControls();
  renderWheel();
  renderPlaylistEditor();
  savePlaylistConfiguration();
}

function activateMainCategory(categoryId) {
  const category = mainCategories.find((candidate) => candidate.id === categoryId);
  if (!category) return;

  activateLoopPlaylist(category.playlistId);
}

function selectAllPhrases() {
  activateLoopPlaylist("loop-phrase-library");
}

function shuffledItems(items) {
  return [...items]
    .map((item) => ({ item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ item }) => item);
}

function selectRandomPhrases() {
  const count = Math.min(Math.max(Number(randomCountInput.value) || 10, 1), phraseLibraryChoiceIds.length);
  randomCountInput.value = String(count);

  let randomPlaylist = playlistsByMode.loop.find((playlist) => playlist.id === "loop-ae-random");
  if (!randomPlaylist) {
    randomPlaylist = {
      id: "loop-ae-random",
      name: `Random ${count}`,
      category: "Attitude & Effort",
      itemIds: [],
    };
    playlistsByMode.loop.push(randomPlaylist);
  }

  randomPlaylist.name = `Random ${count}`;
  randomPlaylist.category = "Attitude & Effort";
  randomPlaylist.itemIds = shuffledItems(phraseLibraryChoiceIds).slice(0, count);
  activateLoopPlaylist(randomPlaylist.id);
}

function loadFiles(files) {
  const activePlaylist = currentPlaylist();
  const newChoices = [...files]
    .filter((file) => file.type.startsWith("audio/"))
    .map((file) => {
      const title = file.name.replace(/\.[^/.]+$/, "").replace(/[_-]+/g, " ").trim() || "Loaded audio";
      return {
        id: `${currentMode}-loaded-${Date.now()}-${Math.random().toString(16).slice(2)}`,
        title,
        file: URL.createObjectURL(file),
        source: "loaded",
      };
    });

  if (!newChoices.length) return;

  choices[currentMode].push(...newChoices);
  activePlaylist.itemIds.push(...newChoices.map((choice) => choice.id));
  renderWheel();
  renderPlaylistEditor();
  fileLoader.value = "";
  savePlaylistConfiguration();
}

function stopPreview() {
  previewAudio.pause();
  previewAudio.currentTime = 0;
  previewingId = null;
}

async function playPreview(itemId) {
  const choice = findChoice(itemId);
  if (!choice) return;

  if (previewingId === itemId && !previewAudio.paused) {
    stopPreview();
    renderPlaylistEditor();
    return;
  }

  audio.pause();
  audio.currentTime = 0;
  setPlayingState(false);
  stopPreview();
  previewingId = itemId;
  previewAudio.src = resolveAudioSource(choice).file;
  updatePlaybackTuning({ save: false });
  previewAudio.volume = audio.volume;
  previewAudio.currentTime = 0;

  try {
    await previewAudio.play();
  } catch {
    previewingId = null;
  }

  renderPlaylistEditor();
}

async function playQueuedTrack() {
  selectedIndexByMode[currentMode] = nextQueuedIndex();
  syncSelection({ scrollBehavior: "smooth", updateAudio: true });
  audio.currentTime = 0;

  try {
    await audio.play();
    setPlayingState(true);
  } catch {
    setPlayingState(false);
  }
}

async function skipToNextTrack() {
  const shouldResume = !audio.paused;

  selectedIndexByMode[currentMode] = nextQueuedIndex();
  syncSelection({ scrollBehavior: "smooth", updateAudio: true });
  audio.currentTime = 0;

  if (!shouldResume) {
    setPlayingState(false);
    return;
  }

  try {
    primeAudioMeter();
    await audio.play();
    setPlayingState(true);
  } catch {
    setPlayingState(false);
  }
}

playButton.addEventListener("click", async () => {
  if (audio.paused) {
    try {
      primeAudioMeter();
      await audio.play();
      setPlayingState(true);
    } catch {
      setPlayingState(false);
    }
  } else {
    audio.pause();
    audio.currentTime = 0;
    setPlayingState(false);
    startMeterAnimation();
  }
});

loopTrigger.addEventListener("click", () => centerSelectedOption("smooth"));

loopWheel.addEventListener("click", (event) => {
  const option = event.target.closest("[role='option']");
  if (option) {
    selectLoop(option);
  }
});

loopWheel.addEventListener("scroll", () => {
  if (scrollFrame) {
    cancelAnimationFrame(scrollFrame);
  }

  scrollFrame = requestAnimationFrame(() => {
    updateSelectionFromScroll({ updateAudio: false });
  });

  clearTimeout(scrollSettleTimer);
  scrollSettleTimer = setTimeout(() => {
    updateSelectionFromScroll({ updateAudio: true });
    centerSelectedOption("smooth");
  }, 140);
});

modeButtons.forEach((button) => {
  button.addEventListener("click", () => setMode(button.dataset.mode));
});

voiceSelect?.addEventListener("change", () => setVoice(voiceSelect.value));
volumeDownButton.addEventListener("click", () => adjustVolume(-5));
volumeUpButton.addEventListener("click", () => adjustVolume(5));
repeatModeButton.addEventListener("click", cycleRepeatMode);
shuffleButton.addEventListener("click", toggleShuffle);
nextButton.addEventListener("click", skipToNextTrack);
openPlaylistButton.addEventListener("click", () => goToPage(1));
openPlayerButton.addEventListener("click", () => goToPage(0));
playlistSelect.addEventListener("change", () => switchPlaylist(playlistSelect.value));
createPlaylistButton.addEventListener("click", createPlaylist);
fileLoader.addEventListener("change", () => loadFiles(fileLoader.files));
selectAllButton.addEventListener("click", selectAllPhrases);
randomSelectionButton.addEventListener("click", selectRandomPhrases);
speedDownButton.addEventListener("click", () => adjustSpeed(-5));
speedUpButton.addEventListener("click", () => adjustSpeed(5));

playlistEditor.addEventListener("click", (event) => {
  const sectionAdd = event.target.closest("[data-add-group]");
  if (sectionAdd) {
    addPlaylistGroup(sectionAdd.dataset.addGroup);
    return;
  }

  const track = event.target.closest(".playlist-track");
  if (!track) return;

  if (event.target.closest(".playlist-preview")) {
    playPreview(track.dataset.itemId);
    return;
  }

  if (event.target.closest(".playlist-membership")) {
    togglePlaylistItem(track.dataset.itemId);
  }
});

mainCategoryTabs?.addEventListener("click", (event) => {
  const categoryButton = event.target.closest("[data-category-id]");
  if (!categoryButton) return;
  activateMainCategory(categoryButton.dataset.categoryId);
});

previewAudio.addEventListener("ended", () => {
  previewingId = null;
  renderPlaylistEditor();
});

volumeControl.addEventListener("input", updateVolume);
volumeControl.addEventListener("change", updateVolume);
speedControl.addEventListener("input", updatePlaybackTuning);
speedControl.addEventListener("change", updatePlaybackTuning);
pitchToggle.addEventListener("click", togglePitchMode);
audio.addEventListener("loadedmetadata", () => updatePlaybackTuning({ save: false }));
previewAudio.addEventListener("loadedmetadata", () => updatePlaybackTuning({ save: false }));
audio.addEventListener("play", () => {
  primeAudioMeter();
  setPlayingState(true);
});
audio.addEventListener("pause", startMeterAnimation);

renderAudioMeter();
applyAudioLooping();
updateQueueButtons();
renderVoiceOptions();
renderPlaylistControls();
renderWheel();
renderPlaylistEditor();
updatePageDots();

if (
  "serviceWorker" in navigator &&
  (location.protocol === "https:" || location.hostname === "localhost")
) {
  navigator.serviceWorker.register("./sw.js").catch(() => {});
}

document.addEventListener("click", (event) => {
  if (!loopPicker.contains(event.target)) {
    centerSelectedOption("smooth");
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    centerSelectedOption("smooth");
    loopWheel.focus({ preventScroll: true });
  }
});

audio.addEventListener("ended", () => {
  if (repeatMode !== "all") {
    setPlayingState(false);
    return;
  }

  playQueuedTrack();
});
