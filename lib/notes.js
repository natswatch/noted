const fs = require('fs');
const path = require('path');

//find note by Title
function filterByQuery(query, notes) {
    let filteredResults = notes;
    if (query.title) {
        filteredResults = filteredResults.filter
            (note => note.title === query.title);
    }
    return filteredResults;
}

// find note by id
function findById(id, notes) {
    const result = notes.filter((note) => note.id === id)[0];
    return result;
}

// saves new note to db
function createNewNote(body, notesArray) {
    const note = body;
    notesArray.push(note);
    fs.writeFileSync(
        path.join(__dirname, "../db/db.json"),
        JSON.stringify({ notes: notesArray }, null, 2)
    );
    return note;
}

//validates new note input
function validateNote(note) {
    if (!note.title || typeof note.title !== "string") {
        return false;
    }
    if (!note.text || typeof note.text !== "string") {
        return false;
    }
    return true;
}

// deletes note by id
function deleteNote(id, notesArray) {
    const noteIndex = id - 1;
    notesArray.splice(noteIndex, 1);
    notesArray.map((note, index) => {
        note.id = index.toString();;
    })
    fs.writeFileSync(
        path.join(__dirname, "../db/db.json"),
        JSON.stringify({ notes: notesArray }, null, 2)
    );
    return notesArray;
}

// exports all functions
module.exports = {
    filterByQuery,
    findById,
    createNewNote,
    validateNote,
    deleteNote
};