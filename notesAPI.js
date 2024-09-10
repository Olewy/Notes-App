const LOCAL_STORAGE_KEY = "notizapp-notizen";

function getNotes() {
  return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
}

function saveNote(title, content, id) {
  const notes = getNotes();
  let selectedNote = notes.find((note) => note.id === id);
  selectedNote = id;

  if (!id) {
    notes.push({
      title,
      content,
      id: getNextId(),
      lastUpdated: new Date().getTime(),
    });
  } else {
    // Inhalt einer Notiz soll nur überschrieben werden
  }

  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(notes));
}

function getNextId() {
  console.log("Calling getNextId()");
  const notes = getNotes();

  const sortedNotes = notes.sort((noteA, noteB) => noteA.id - noteB.id);

  let nextId = 1;

  for (let note of sortedNotes) {
    if (nextId < note.id) break;

    nextId = note.id + 1;
    console.log(note);
  }

  return nextId;
}
