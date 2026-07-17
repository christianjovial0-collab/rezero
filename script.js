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

const burger = document.querySelector('#burger')
const nav = document.querySelector('nav')

burger.addEventListener('click', function() {
    nav.classList.toggle('open')
})

document.addEventListener('click', function (e) {
    if (!nav.contains(e.target) && e.target !== burger) {
        nav.classList.remove('open')
    }
})

