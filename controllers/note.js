
const Note = require('../models/notes');

async function getAllNotes(req, res) {
    try {
        const allNotes = await Note.find();
        res.json(allNotes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

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

async function deleteNote(req, res) {
    try {
        await res.note.deleteOne();
        res.json({ message: 'Note deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

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
    res.note = note;
    next();
}

module.exports = {
    getAllNotes,
    createNote,
    updateNote,
    deleteNote,
    searchNotes,
    getNote
};
