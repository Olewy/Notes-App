const modeToggleButton = document.getElementById("darkWhiteModeToggle");
const body = document.body;

// Initialisiere Modus beim Laden der Seite
if (localStorage.getItem("theme") === "white") {
  body.classList.add("white");
}

modeToggleButton.addEventListener("click", function () {
  body.classList.toggle("white");

  if (body.classList.contains("white")) {
    localStorage.setItem("theme", "white");
  } else {
    localStorage.setItem("theme", "dark");
  }
});
