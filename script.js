const toogle = document.getElementById("theme");
const root = document.documentElement;

// recupere la preference sauvegardée, sinon celle du systeme
// const saved = localStorage.getItem('theme');
// const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
// const initial = saved || (prefersDark ? 'dark' : 'light');
// root.setAttribute('data-theme', initial);
// updateButton(initial);

toogle.addEventListener("click", () => {
  const current = root.getAttribute("data-theme");
  const next = current === "dark" ? "light" : "dark";
  root.setAttribute("data-theme", next);
  // localStorage.setItem('theme', next);
  // updateButton(next);
  //   toogle.textContent = next === "dark" ? "🌞" : "🌙";
});

// function updateButton(theme) {
//     toogle.textContent = theme == 'dark' ? '🌞' : '🌙';
// }
