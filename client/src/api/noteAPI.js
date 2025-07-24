import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/notes"
});

export const fetchNotes = () => API.get("/");
export const createNote = (note) => API.post("/", note);
export const fetchNoteById = (id) => API.get(`/${id}`);
export const updateNote = (id, updatedNote) => API.put(`/${id}`, updatedNote);
export const deleteNote = (id) => API.delete(`/${id}`);
