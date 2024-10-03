const notesListEl = document.querySelector(".notes-list");
const saveButtonEl = document.querySelector(".save-note");
const titleInputEl = document.getElementById("title-input");
const contentInputEl = document.getElementById("content-input");
const createNewNoteEl = document.getElementById("create-new-note");
const deleteButtonEl = document.querySelector(".delete-note");
const showFavoritesButton = document.getElementById("sortFavoriteNotes");
const sidebarEl = document.querySelector(".sidebar");
const searchNotesInput = document.getElementById("searchNotes");
const searchButtonEl = document.getElementById("search");

let isFavoritesOn = false;

saveButtonEl.addEventListener("click", clickSaveButton);
deleteButtonEl.addEventListener("click", clickDeleteButton);
createNewNoteEl.addEventListener("click", newNoteButton);
showFavoritesButton.addEventListener("click", toggleFavoriteButton);
searchNotesInput.addEventListener("input", function () {
  const searchTerm = searchNotesInput.value.toLowerCase();
  displayNotesList(searchTerm);
});

displayNotesList();

function displayNotesList(searchTerm = "") {
  const notes = getNotes();

  const filteredNotes = isFavoritesOn
    ? notes.filter((note) => {
        return (
          note.isFavorite &&
          (note.title.toLowerCase().includes(searchTerm) ||
            note.content.toLowerCase().includes(searchTerm))
        );
      })
    : notes.filter((note) => {
        return (
          note.title.toLowerCase().includes(searchTerm) ||
          note.content.toLowerCase().includes(searchTerm)
        );
      });

  const sortedNotes = filteredNotes.sort(
    (noteA, noteB) => noteB.lastUpdated - noteA.lastUpdated
  );

  let html = "";

  sortedNotes.forEach((note) => {
    html += `
          <div class="note-card" data-id="${note.id}" 
          onclick="selectNote(${note.id})">
          <h3 class="note-title">${escapeHtml(note.title)}</h3>
          <p class="note-content-preview">
            ${escapeHtml(note.content)}
          </p>
          <p class="note-date">
          <svg id="starIcon" class="star-icon-disabled${
            note.isFavorite ? " star-icon-enabled" : ""
          }" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/>
            </svg>
            ${new Date(note.lastUpdated).toLocaleDateString("de-DE")}, 
            ${new Date(note.lastUpdated).toLocaleTimeString("de-DE")}
          </p>
          </div>
          <div class="note-divider"></div>`;
  });

  notesListEl.innerHTML = html;

  if (notesListEl.innerHTML == []) {
    let noNotesEl = document.createElement("p");
    noNotesEl.textContent = "noch keine Notizen hier";
    noNotesEl.classList.add("no-notes-text-enabled");
    notesListEl.append(noNotesEl);
  }
}

function toggleFavoriteButton() {
  isFavoritesOn = !isFavoritesOn;

  if (isFavoritesOn) {
    showFavoritesButton.classList.add("sort-favorites-button-pressed");
  } else {
    showFavoritesButton.classList.remove("sort-favorites-button-pressed");
  }

  displayNotesList();

  titleInputEl.value = "";
  contentInputEl.value = "";
}

function clickSaveButton() {
  const title = titleInputEl.value;
  const content = contentInputEl.value;

  if (!title || !content) {
    alert("Bitte gebe ein Titel und ein paar Notizen ein.");
    return;
  }

  const currentlySelectedNote = document.querySelector(".selected-note");

  let id = undefined;

  if (currentlySelectedNote) {
    id = Number(currentlySelectedNote.getAttribute("data-id"));
  }

  saveNote(title, content, id);

  titleInputEl.value = "";
  contentInputEl.value = "";

  displayNotesList();
}

function selectNote(id) {
  let notes = getNotes();
  const currentlySelectedNote = notes.find((note) => note.id === id);

  const noteEl = document.querySelectorAll(".note-card");
  noteEl.forEach((note) => {
    note.classList.remove("selected-note");
    if (id === Number(note.getAttribute("data-id"))) {
      note.classList.add("selected-note");
    }
  });

  titleInputEl.value = currentlySelectedNote.title;
  contentInputEl.value = currentlySelectedNote.content;
}

function clickDeleteButton() {
  let notes = getNotes();

  const currentlySelectedNote = document.querySelector(".selected-note");

  if (currentlySelectedNote) {
    id = Number(currentlySelectedNote.getAttribute("data-id"));
  }

  const filteredNotes = notes.filter((note) => note.id !== id);
  notes = filteredNotes;

  titleInputEl.value = "";
  contentInputEl.value = "";

  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(notes));

  displayNotesList();
}

function newNoteButton() {
  const noteEl = document.querySelectorAll(".note-card");

  noteEl.forEach((note) => {
    note.classList.remove("selected-note");
  });

  titleInputEl.value = "";
  contentInputEl.value = "";

  titleInputEl.focus();
}

function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
