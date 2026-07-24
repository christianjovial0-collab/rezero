const toogle = document.getElementById("theme");
const root = document.documentElement;

toogle.addEventListener("click", () => {
  const current = root.getAttribute("data-theme");
  const next = current === "dark" ? "light" : "dark";
  root.setAttribute("data-theme", next);
});

// const toggleBtn = document.querySelector('#theme');

// toggleBtn.addEventListener('click', () => {
//   document.body.classlist.toggle('dark-mode');
// });

//========================== BURGER =============================

const burger = document.querySelector("#burger");
const nav = document.querySelector("nav");

burger.addEventListener("click", function () {
  nav.classList.toggle("open");
});

document.addEventListener("click", function (e) {
  if (!nav.contains(e.target) && e.target !== burger) {
    nav.classList.remove("open");
  }
});

// ========================== SELECTION =========================

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", () => {
    const targetId = link.getAttribute("href").slice(1);
    const targetEl = document.getElementById(targetId);
    if (!targetEl) return;

    targetEl.classList.remove("flash");
    void targetEl.offsetWidth; // reset forcé
    targetEl.classList.add("flash");
  });
});

// function flashTarget() {
//   const hash = window.location.hash.slice(1);
//   if (!hash) return;
//   const targetEl = document.getElementById(hash);
//   if (!targetEl) return;
//   targetEl.classList.remove('flash');
//   void targetEl.offsetWidth;
//   targetEl.classList.add('flash');
// }
// window.addEventListener('hashchange', flashTarget);
