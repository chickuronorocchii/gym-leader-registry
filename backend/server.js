const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const GymLeader = require('./models/GymLeader');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB Atlas successfully.'))
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });

// --- REST API Endpoints ---

// 1. GET /api/leaders - Read all leaders
app.get('/api/leaders', async (req, res) => {
  try {
    const leaders = await GymLeader.find().sort({ createdAt: -1 });
    res.status(200).json(leaders);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error', message: err.message });
  }
});

// 2. GET /api/leaders/:id - Read one leader by ID
app.get('/api/leaders/:id', async (req, res) => {
  try {
    const leader = await GymLeader.findById(req.params.id);
    if (!leader) {
      return res.status(404).json({ error: 'Gym Leader not found.' });
    }
    res.status(200).json(leader);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error', message: err.message });
  }
});

// 3. POST /api/leaders - Create a new Gym Leader
app.post('/api/leaders', async (req, res) => {
  try {
    const newLeader = new GymLeader(req.body);
    const savedLeader = await newLeader.save();
    res.status(201).json(savedLeader);
  } catch (err) {
    res.status(400).json({ error: 'Validation Failed', message: err.message });
  }
});

// 4. PUT /api/leaders/:id - Update an existing Gym Leader
app.put('/api/leaders/:id', async (req, res) => {
  try {
    const updatedLeader = await GymLeader.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedLeader) {
      return res.status(404).json({ error: 'Gym Leader not found.' });
    }
    res.status(200).json(updatedLeader);
  } catch (err) {
    res.status(400).json({ error: 'Validation or Update Failed', message: err.message });
  }
});

// 5. DELETE /api/leaders/:id - Delete a Gym Leader
app.delete('/api/leaders/:id', async (req, res) => {
  try {
    const deletedLeader = await GymLeader.findByIdAndDelete(req.params.id);
    if (!deletedLeader) {
      return res.status(404).json({ error: 'Gym Leader not found.' });
    }
    res.status(200).json({ message: 'Gym Leader successfully removed from the registry.' });
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error', message: err.message });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Gym Leader Registry backend server is running on port ${PORT}`);
});