import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchNoteById, updateNote } from "../api/noteAPI";

export default function EditSection() {
  const { id } = useParams();
  console.log("URL param id:", id);

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("None");
  const [priority, setPriority] = useState("Medium");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadNote() {
      try {
        const res = await fetchNoteById(id);
        const note = res.data;
        console.log("Loaded note:", note); // ← LOG HERE

        setTitle(note.title || "");
        setContent(note.content || "");
        setCategory(note.category || "None");
        setPriority(note.priority || "Medium");
        setLoading(false);
      } catch (err) {
        console.error("Failed to load note:", err);
        setLoading(false);
      }
    }

    loadNote();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updated = { title, content, category, priority };
    await updateNote(id, updated);
    navigate("/");
  };

  if (loading) return <p>Loading note...</p>;

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Note</h2>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

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

      <button type="submit">Save</button>
    </form>
  );
}
