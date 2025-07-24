import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import NoteForm from "./components/NoteForm";
import NotesList from "./components/NotesList";
import EditSection from "./components/editSection";
import { deleteNote } from "./api/noteAPI";

function App() {
  const [reloadFlag, setReloadFlag] = useState(0);

  const reloadNotes = () => {
    setReloadFlag((prev) => prev + 1);
  };

  const handleDelete = async (id) => {
    await deleteNote(id);
    reloadNotes();
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>🧠 My Notes App</h1>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <NoteForm onNoteCreated={reloadNotes} />
              <NotesList reloadFlag={reloadFlag} onDelete={handleDelete} />
            </>
          }
        />
        <Route path="/edit/:id" element={<EditSection />} />
      </Routes>
    </div>
  );
}

export default App;
