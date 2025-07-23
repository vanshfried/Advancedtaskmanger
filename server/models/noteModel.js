const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  content: { type: String, required: true },
  priority: { type: String, enum: ["High", "Medium", "Low"], default: "Low" },
  category: { type: String, default: "General" },
  tags: { type: [String], default: [] },
  pinned: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  completed: { type: Boolean, default: false },
});

module.exports = mongoose.model("Note", NoteSchema);
