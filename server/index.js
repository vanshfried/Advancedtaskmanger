require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const noteRoutes = require("./routes/notesRoutes");

const app = express();
const PORT = process.env.PORT || 5000;
const URI = process.env.MONGODB_URI;

// Middlewares
app.use(cors());
app.use(express.json()); // To parse JSON bodies

// Routes
app.use("/api/notes", noteRoutes);

// MongoDB connection
mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("✅ Connected to MongoDB");
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
})
.catch((err) => {
  console.error("❌ Error connecting to MongoDB:", err);
});
