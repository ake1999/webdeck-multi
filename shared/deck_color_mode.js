const STORAGE_KEY = "deck-color-mode";
const PREFERENCES = ["light", "dark", "system"];

function escapeCssUrl(value) {
  return String(value || "").replace(/["\\\n\r]/g, "");
}

export function resolveColorMode(preference) {
  if (preference === "light" || preference === "dark") return preference;
  if (typeof window !== "undefined" && window.matchMedia) {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  return "light";
}

function buttonIconClass(preference) {
  if (preference === "dark") return "fa-solid fa-moon";
  if (preference === "light") return "fa-solid fa-sun";
  return "fa-solid fa-circle-half-stroke";
}

function buttonAriaLabel(preference, resolvedMode) {
  if (preference === "system") {
    return `Color mode: automatic (${resolvedMode}). Click to cycle.`;
  }
  return `Color mode: ${preference}. Click to cycle.`;
}

export function initDeckColorMode({
  deckEl,
  theme,
  homeIconSrc = "",
  homeIconDarkSrc = "",
  urlPreference = "",
  controlsEl = null,
} = {}) {
  const noop = {
    getPreference: () => "light",
    getMode: () => "light",
    setPreference: () => {},
    cyclePreference: () => {},
  };

  if (!deckEl || theme !== "arian") return noop;

  let preference = PREFERENCES.includes(urlPreference)
    ? urlPreference
    : (localStorage.getItem(STORAGE_KEY) || "system");
  if (!PREFERENCES.includes(preference)) preference = "system";

  let mediaQuery = null;
  let toggleBtn = null;

  function watermarkUrl(isDark) {
    const src = isDark && homeIconDarkSrc ? homeIconDarkSrc : homeIconSrc;
    return src ? `url("${escapeCssUrl(src)}")` : "";
  }

  function apply() {
    const mode = resolveColorMode(preference);
    const isDark = mode === "dark";
    deckEl.classList.toggle("theme-dark", isDark);
    document.body.classList.toggle("dark-mode", isDark);

    const watermark = watermarkUrl(isDark);
    if (watermark) {
      deckEl.style.setProperty("--deck-slide-watermark-image", watermark);
    }

    if (toggleBtn) {
      const iconClass = buttonIconClass(preference);
      toggleBtn.innerHTML = `<i class="${iconClass}" aria-hidden="true"></i>`;
      toggleBtn.title = buttonAriaLabel(preference, mode);
      toggleBtn.setAttribute("aria-label", buttonAriaLabel(preference, mode));
      toggleBtn.setAttribute("aria-pressed", String(isDark));
    }
  }

  function setPreference(next) {
    if (!PREFERENCES.includes(next)) return;
    preference = next;
    localStorage.setItem(STORAGE_KEY, next);
    apply();
  }

  function cyclePreference() {
    const index = PREFERENCES.indexOf(preference);
    setPreference(PREFERENCES[(index + 1) % PREFERENCES.length]);
  }

  if (controlsEl) {
    toggleBtn = document.createElement("button");
    toggleBtn.type = "button";
    toggleBtn.className = "nav-btn color-mode-btn";
    toggleBtn.addEventListener("click", cyclePreference);
    controlsEl.insertBefore(toggleBtn, controlsEl.firstChild);
  }

  if (typeof window !== "undefined" && window.matchMedia) {
    mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const onSystemChange = () => {
      if (preference === "system") apply();
    };
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", onSystemChange);
    } else if (mediaQuery.addListener) {
      mediaQuery.addListener(onSystemChange);
    }
  }

  apply();

  return {
    getPreference: () => preference,
    getMode: () => resolveColorMode(preference),
    setPreference,
    cyclePreference,
  };
}