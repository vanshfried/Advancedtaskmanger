import { useState } from "react";
import NoteForm from "./components/NoteForm";
import NotesList from "./components/NotesList";
import { deleteNote } from "./api/noteAPI";
function App() {
  const [reloadFlag, setReloadFlag] = useState(0);

  const reloadNotes = () => {
    setReloadFlag((prev) => prev + 1); // Triggers NotesList to reload
  };

 const handleDelete = async (id) => {
    await deleteNote(id);
    reloadNotes();
  };
  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>🧠 My Notes App</h1>
      <NoteForm onNoteCreated={reloadNotes} />
      <NotesList reloadFlag={reloadFlag} onDelete={handleDelete}/>
    </div>
  );
}

export default App;
