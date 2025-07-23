import React, { useEffect, useState } from 'react';
import { fetchNotes } from '../api/noteAPI';

const NotesList = ({ reloadFlag,onDelete  }) => {
  const [notes, setNotes] = useState([]);

  const loadNotes = async () => {
    try {
      const res = await fetchNotes();
      setNotes(res.data);
    } catch (err) {
      console.error("❌ Failed to fetch notes:", err);
    }
  };

  

  useEffect(() => {
    loadNotes();
  }, [reloadFlag]);

  return (
    <div style={{ padding: '1rem' }}>
      <h2>📒 Notes</h2>
      {notes.length === 0 ? (
        <p>No notes found.</p>
      ) : (
        <ul>
          {notes.map((note) => (
            <li key={note._id}>
              {note.title} - <strong>{note.content}</strong> [{note.priority}], {note.category}
              <button
                style={{ marginLeft: '1rem', color: 'white', background: 'red' }}
                onClick={() => onDelete(note._id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NotesList;
