import React, { useState } from "react";
import { createNote } from "../api/noteAPI";

const NoteForm = ({ onNoteCreated }) => {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [category, setCategory] = useState("None");
  const [content,setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Title is required!");
      return;
    }

    const newNote = { title, priority, category, content };

    try {
      await createNote(newNote);
      setTitle("");
      setPriority("Medium");
      setCategory("None");
      setContent("");
      if (onNoteCreated) onNoteCreated(); // ← Triggers parent refresh
    } catch (err) {
      console.error("❌ Failed to create note:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Note title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea  value={content} onChange={(e) => setContent(e.target.value)}></textarea>

      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>

      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="None">None</option>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
      </select>

      <button type="submit">Add Note</button>
    </form>
  );
};

export default NoteForm;
