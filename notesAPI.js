const LOCAL_STORAGE_KEY = "notizapp-notizen";

function getNotes() {
  return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
}

function saveNote(title, content, id) {
  const notes = getNotes();
  let currentlySelectedNote = notes.find((note) => note.id === id);

  if (!id) {
    notes.push({
      title,
      content,
      id: getNextId(),
      isFavorite: false,
      lastUpdated: new Date().getTime(),
    });
  } else {
    currentlySelectedNote.title = titleInputEl.value;
    currentlySelectedNote.content = contentInputEl.value;
    currentlySelectedNote.lastUpdated = new Date().getTime();
  }

  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(notes));
}

function getNextId() {
  const notes = getNotes();

  const sortedNotes = notes.sort((noteA, noteB) => noteA.id - noteB.id);

  let nextId = 1;

  for (let note of sortedNotes) {
    if (nextId < note.id) break;

    nextId = note.id + 1;
  }

  return nextId;
}
