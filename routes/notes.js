// routes/notes.js

const express = require('express');
const router = express.Router();
const { getAllNotes, createNote, updateNote, deleteNote, searchNotes } = require('../controllers/note');
const Note = require('../models/notes');

// Getting all
router.get('/', getAllNotes);

// Creating one
router.post('/', createNote);

// Update one
router.patch('/:id', getNote, updateNote);

// Delete one
router.delete('/:id', getNote, deleteNote);

/// Search notes by title or content
router.get('/search', searchNotes);

async function getNote(req, res, next) {
    let note;
    try {
        note = await Note.findById(req.params.id);
        if (note == null) {
            return res.status(404).json({ message: 'Cannot find note' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.note = note
    next();
}

module.exports = router;
