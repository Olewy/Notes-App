const favoriteButton = document.getElementById("favoriteButton");

favoriteButton.addEventListener("click", clickFavoriteButton);

function clickFavoriteButton() {
  const notes = getNotes();

  const currentlySelectedNoteEl = document.querySelector(".selected-note");

  const starIcon = currentlySelectedNoteEl.querySelector(".star-icon-disabled");

  let id = Number(currentlySelectedNoteEl.getAttribute("data-id"));

  const selectedNoteFromLocalStorage = notes.find((note) => note.id === id);

  if (selectedNoteFromLocalStorage.isFavorite === false) {
    selectedNoteFromLocalStorage.isFavorite = true;
    starIcon.classList.add("star-icon-enabled");
  } else {
    selectedNoteFromLocalStorage.isFavorite = false;
    starIcon.classList.remove("star-icon-enabled");
  }

  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(notes));
}
