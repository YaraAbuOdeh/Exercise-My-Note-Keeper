// controllers/note.js

const Note = require('../models/notes');

// Controller for getting all notes
async function getAllNotes(req, res) {
    try {
        const allNotes = await Note.find();
        res.json(allNotes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// Controller for creating a new note
async function createNote(req, res) {
    const { title, content } = req.body;
    const newNote = new Note({
        title,
        content
    });
    try {
        const savedNote = await newNote.save();
        res.status(201).json(savedNote);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

// Controller for updating a note
async function updateNote(req, res) {
    const { title, content } = req.body;
    if (title != null) {
        res.note.title = title;
    }
    if (content != null) {
        res.note.content = content;
    }
    try {
        const updatedNote = await res.note.save();
        res.json(updatedNote);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

// Controller for deleting a note
async function deleteNote(req, res) {
    try {
        await res.note.deleteOne();
        res.json({ message: 'Note deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// Controller for searching notes by title or content
async function searchNotes(req, res) {
    const query = req.query.query;
    try {
        const searchResult = await Note.find({
            $or: [
                { title: { $regex: query, $options: 'i' } },
                { content: { $regex: query, $options: 'i' } }
            ]
        });
        res.json(searchResult);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = {
    getAllNotes,
    createNote,
    updateNote,
    deleteNote,
    searchNotes
};
