const {
    filterByQuery,
    findById,
    createNewNote,
    validateNote,
    deleteNote
} = require('../../lib/notes')
const router = require('express').Router();
const { notes } = require('../../db/db.json');

router.get('/notes', (req, res) => {
    let all = notes;
    res.json(all);
});

router.get('/notes/:id', (req, res) => {
    const result = findById(req.params.id, notes);
    res.json(result);
});

// request to add a note
router.post('/notes', (req, res) => {
    req.body.id = notes.length.toString();
    
    if (!validateNote(req.body)) {
        res.status(400).send('The note is not properly formatted.');
    } else {
        const note = createNewNote(req.body, notes);
        res.json(note);
    }
});

//request to delete note by id
router.delete('/notes/:id', (req, res) => {
    const result = deleteNote(req.params.id, notes);
    res.json(result);
});

module.exports = router;