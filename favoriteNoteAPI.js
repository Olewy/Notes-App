// addEventListener("DOMContentLoaded", clickFavoriteButton());

const favoriteButton = document.getElementById("favoriteButton");

favoriteButton.addEventListener("click", clickFavoriteButton);

function clickFavoriteButton() {
  const notes = getNotes();

  const currentlySelectedNote = document.querySelector(".selected-note");

  const starIcon = currentlySelectedNote.querySelector(".star-icon-disabled");

  let id = Number(currentlySelectedNote.getAttribute("data-id"));

  let currentlySelectedStarEl = notes.find((note) => note.id === id);
  // umbennenen

  console.log(id);

  if (currentlySelectedStarEl.isFavorite === false) {
    currentlySelectedStarEl.isFavorite = true;
    starIcon.classList.add("star-icon-enabled");
  } else {
    currentlySelectedStarEl.isFavorite = false;
    starIcon.classList.remove("star-icon-enabled");
  }
  // Den if code block woanders zusätzlich einfügen damit beim Laden der Seite die Klassen dem starIcon hinzugefügt werden -> displayNotes? saveNote?

  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(notes));

  console.log(currentlySelectedStarEl);
}
