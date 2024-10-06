const modeToggleButton = document.getElementById("darkLightModeToggle");
const body = document.body;

// Initialisiere Modus beim Laden der Seite
if (localStorage.getItem("theme") === "light") {
  body.classList.add("light");
}

modeToggleButton.addEventListener("click", function () {
  body.classList.toggle("light");

  if (body.classList.contains("light")) {
    localStorage.setItem("theme", "light");
  } else {
    localStorage.setItem("theme", "dark");
  }
});
