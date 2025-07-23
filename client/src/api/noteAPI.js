import axios from 'axios';

const API = 'http://localhost:5000/api/notes';

export const fetchNotes = () => axios.get(API);
export const createNote = (note) => axios.post(API, note);
export const updateNote = (id, updatedNote) => axios.put(`${API}/${id}`, updatedNote);
export const deleteNote = (id) => axios.delete(`${API}/${id}`);