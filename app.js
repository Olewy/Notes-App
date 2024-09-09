const notesListEl = document.querySelector(".notes-list");
const saveButtonEl = document.querySelector(".save-note");
const titleInputEl = document.getElementById("title-input");
const contentInputEl = document.getElementById("content-input");

saveButtonEl.addEventListener("click", clickSaveButton);

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
            <h3 class="note-title">${note.title}</h3>
            <p class="note-content-preview">
            ${note.content}
            </p>
            <p class="note-date">
            ${new Date(note.lastUpdated).toLocaleDateString("de-DE")}, 
            ${new Date(note.lastUpdated).toLocaleTimeString("de-DE")}
            </p>
          </div>`;
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

  saveNote(title, content);

  titleInputEl.value = "";
  contentInputEl.value = "";

  displayNotesList();
}

function selectNote(id) {
  const notes = getNotes();
  const selectedNote = notes.find((note) => note.id === id);

  titleInputEl.value = selectedNote.title;
  contentInputEl.value = selectedNote.content;
  console.log(id);
}
