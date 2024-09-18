const notesListEl = document.querySelector(".notes-list");
const saveButtonEl = document.querySelector(".save-note");
const titleInputEl = document.getElementById("title-input");
const contentInputEl = document.getElementById("content-input");
const createNewNoteEl = document.getElementById("create-new-note");
const deleteButtonEl = document.querySelector(".delete-note");

saveButtonEl.addEventListener("click", clickSaveButton);
deleteButtonEl.addEventListener("click", clickDeleteButton);
createNewNoteEl.addEventListener("click", newNoteButton);

displayNotesList();

function displayNotesList() {
  const notes = getNotes();

  const sortedNotes = notes.sort(
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
            ${new Date(note.lastUpdated).toLocaleDateString("de-DE")}, 
            ${new Date(note.lastUpdated).toLocaleTimeString("de-DE")}
            </p>
          </div>
          <div class="note-divider"></div>`;
  });

  notesListEl.innerHTML = html;
}

function clickSaveButton() {
  const title = titleInputEl.value;
  const content = contentInputEl.value;

  if (!title || !content) {
    alert("Please enter titel and notes");
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
  const selectedNote = notes.find((note) => note.id === id);

  const noteEl = document.querySelectorAll(".note-card");
  noteEl.forEach((note) => {
    note.classList.remove("selected-note");
    if (id === Number(note.getAttribute("data-id"))) {
      note.classList.add("selected-note");
    }
  });

  titleInputEl.value = selectedNote.title;
  contentInputEl.value = selectedNote.content;
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
