const express = require('express');
const router = express.Router();
const { getAllNotes, createNote, updateNote, deleteNote, searchNotes,getNote } = require('../controllers/note');
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



module.exports = router;
