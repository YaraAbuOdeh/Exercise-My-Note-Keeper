const express = require('express');
const router = express.Router();
const Note = require('../models/notes');

// Getting all
router.get('/', async (req, res) => {
    try {
        const getAllNotes = await Note.find();
        res.json(getAllNotes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Creating one
router.post('/', async (req, res) => {
    const addNewNote = new Note({
        title: req.body.title,
        Content: req.body.Content
    });
    try {
        const saveNewNote = await addNewNote.save();
        res.status(201).json(saveNewNote);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update one
router.patch('/:id', getNote, async (req, res) => {
    if (req.body.title != null) {
        res.note.title = req.body.title;
    }
    if (req.body.Content != null) {
        res.note.Content = req.body.Content;
    }
    try {
        const updateNote = await res.note.save();
        res.json(updateNote);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete one
router.delete('/:id', getNote, async (req, res) => {
    try {
        console.log("hi hi "+res.note)
        await res.note.deleteOne()
        res.json({ message: 'Note deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

/// Search notes by title or content
router.get('/search', async (req, res) => {
    const query = req.query.query;
    try {
        const searchResult = await Note.find({
            $or: [
                { title: { $regex: query, $options: 'i' } },
                { Content: { $regex: query, $options: 'i' } }
            ]
        });
        res.json(searchResult);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

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