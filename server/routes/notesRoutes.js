const express = require("express");
const router = express.Router();
const Note = require("../models/noteModel"); 

router.post("/", async (req, res) => {
  try {
    const newTask = await Note.create(req.body);
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
router.get('/', async (req, res) => {
  const priorityOrder = { High: 1, Medium: 2, Low: 3 };
  try {
    let tasks = await Note.find();
    tasks.sort((a, b) => {
      // Sort by completed first (incomplete first), then priority, then createdAt
      if (a.completed !== b.completed) {
        return a.completed - b.completed;
      }

      if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }

      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Export the router!
module.exports = router;
