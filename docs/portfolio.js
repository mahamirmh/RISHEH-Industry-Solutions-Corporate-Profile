import {
  messages,
  projects,
  getProject,
  normalizeLanguage,
  repositoryUrl,
  sourceUrl,
} from "./content.js";
const $ = (id) => document.getElementById(id);
const url = new URL(window.location.href);
let stored = "en";
try {
  stored = localStorage.getItem("risheh-language") || "en";
} catch {}
let language = normalizeLanguage(url.searchParams.get("lang") || stored);
let selected = getProject(url.searchParams.get("industry")).id;
const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
let trigger = null;
function text(id, value) {
  $(id).textContent = value;
}
function replaceChildrenText(element, tag, values) {
  element.replaceChildren(
    ...values.map((value) => {
      const node = document.createElement(tag);
      node.textContent = value;
      return node;
    }),
  );
}
function syncUrl() {
  const next = new URL(window.location.href);
  next.searchParams.set("lang", language);
  next.searchParams.set("industry", selected);
  try {
    window.history.replaceState(null, "", next);
  } catch {}
}
function renderProject(announce = false) {
  const project = getProject(selected),
    copy = project[language],
    m = messages[language];
  text("project-title", copy.name);
  text("project-sector", m[selected]);
  text(
    "project-number",
    `${new Intl.NumberFormat(language === "fa" ? "fa-IR" : "en").format(projects.indexOf(project) + 1)} / ${new Intl.NumberFormat(language === "fa" ? "fa-IR" : "en").format(projects.length)}`,
  );
  for (const key of ["headline", "description", "challenge", "direction"])
    text(`project-${key}`, copy[key]);
  text("project-status", copy.evidence);
  $("repository-link").href = repositoryUrl(project);
  document
    .querySelectorAll("[data-select]")
    .forEach((button) =>
      button.setAttribute(
        "aria-pressed",
        String(button.dataset.select === selected),
      ),
    );
  document
    .querySelectorAll("[data-sector]")
    .forEach((link) =>
      link.dataset.sector === selected
        ? link.setAttribute("aria-current", "true")
        : link.removeAttribute("aria-current"),
    );
  if (announce) text("selection-status", m.projectSelected + copy.name);
  if ($("story-dialog").open) renderDialog();
}
function setLanguage(value) {
  language = normalizeLanguage(value);
  const m = messages[language];
  document.documentElement.lang = language;
  document.documentElement.dir = language === "fa" ? "rtl" : "ltr";
  document.title = m.title;
  document.querySelector("meta[name=description]").content = m.description;
  document.querySelector('meta[property="og:title"]').content = m.title;
  document.querySelector('meta[property="og:description"]').content =
    m.description;
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    node.textContent = m[node.dataset.i18n];
  });
  document
    .querySelectorAll("[data-i18n-aria]")
    .forEach((node) =>
      node.setAttribute("aria-label", m[node.dataset.i18nAria]),
    );
  $("language").textContent = language === "en" ? "فارسی" : "English";
  $("language").lang = language === "en" ? "fa" : "en";
  $("language").setAttribute("aria-label", m.switchLanguage);
  $("menu-toggle").textContent =
    m[$("mobile-nav").hidden ? "menu" : "closeMenu"];
  try {
    localStorage.setItem("risheh-language", language);
  } catch {}
  renderProject();
  syncUrl();
}
function selectProject(id, announce = true) {
  selected = getProject(id).id;
  renderProject(announce);
  syncUrl();
  const story = document.querySelector(".project-story");
  story.classList.remove("is-entering");
  if (!reduced.matches) {
    void story.offsetWidth;
    story.classList.add("is-entering");
  }
}
function setMenu(open) {
  $("mobile-nav").hidden = !open;
  $("menu-toggle").setAttribute("aria-expanded", String(open));
  $("menu-toggle").textContent =
    messages[language][open ? "closeMenu" : "menu"];
}
function renderDialog() {
  const project = getProject(selected),
    copy = project[language];
  text("dialog-title", copy.name);
  text("dialog-sector", messages[language][selected]);
  text("dialog-question", copy.question);
  replaceChildrenText($("dialog-narrative"), "p", copy.narrative);
  replaceChildrenText($("dialog-scope"), "li", copy.scope);
  text("dialog-evidence", copy.evidence);
  $("dialog-source").href = sourceUrl(project);
}
$("language").addEventListener("click", () =>
  setLanguage(language === "en" ? "fa" : "en"),
);
$("menu-toggle").addEventListener("click", () =>
  setMenu($("mobile-nav").hidden),
);
$("mobile-nav")
  .querySelectorAll("a")
  .forEach((link) => link.addEventListener("click", () => setMenu(false)));
$("mobile-nav").addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    setMenu(false);
    $("menu-toggle").focus();
  }
});
window.matchMedia("(min-width: 801px)").addEventListener("change", (event) => {
  if (event.matches) setMenu(false);
});
document
  .querySelectorAll("[data-select]")
  .forEach((button) =>
    button.addEventListener("click", () =>
      selectProject(button.dataset.select),
    ),
  );
document
  .querySelectorAll("[data-sector]")
  .forEach((link) =>
    link.addEventListener("click", () => selectProject(link.dataset.sector)),
  );
$("read-story").addEventListener("click", (event) => {
  trigger = event.currentTarget;
  renderDialog();
  $("story-dialog").showModal();
  document.body.classList.add("modal-open");
  $("close-dialog").focus();
});
$("close-dialog").addEventListener("click", () => $("story-dialog").close());
$("story-dialog").addEventListener("click", (event) => {
  if (event.target === $("story-dialog")) {
    const rect = $("story-dialog").getBoundingClientRect();
    if (
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom
    )
      $("story-dialog").close();
  }
});
$("story-dialog").addEventListener("close", () => {
  document.body.classList.remove("modal-open");
  trigger?.focus();
});
window.addEventListener("popstate", () => {
  const u = new URL(window.location.href);
  selected = getProject(u.searchParams.get("industry")).id;
  setLanguage(u.searchParams.get("lang"));
});
setLanguage(language);
// Native scroll timelines handle visual storytelling. IntersectionObserver only updates navigation semantics.
if ("IntersectionObserver" in window) {
  const links = [...document.querySelectorAll(".chapter-rail a")],
    visible = new Map();
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => visible.set(entry.target, entry));
      const active = [...visible.values()]
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!active) return;
      const id = active.target.classList.contains("hero")
        ? "main"
        : active.target.id;
      links.forEach((link) =>
        link.getAttribute("href") === `#${id}`
          ? link.setAttribute("aria-current", "location")
          : link.removeAttribute("aria-current"),
      );
    },
    { rootMargin: "-10% 0px -40% 0px", threshold: [0, 0.1, 0.3, 0.6] },
  );
  document
    .querySelectorAll(".chapter")
    .forEach((section) => observer.observe(section));
}
