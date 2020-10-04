const fs = require('fs');
const {
    filterByQuery,
    findById,
    createNewNote,
    validateNote,
    deleteNote
} = require('../lib/notes.js');
const { notes } = require("../db/db");

jest.mock("fs");
test("creates a note object", () => {
    const note = createNewNote(
        { title: "Landing Page", id: "1234234"},
        notes
    );

    expect(note.title).toBe("Landing Page");
    expect(note.id).toBe("1234234");
});

test("filters by query", () => {
    const preNote = [
        {
            title: "Landing Page",
            text: "link to a notes page",
            id: "2",
        },
        {
            title: "Existing Notes",
            text: "listed on the left",
            id: "3",
        },
    ];
    const searchedNote = filterByQuery({ title: "Existing Notes" }, preNote);

    expect(searchedNote.length).toEqual(1);

});

test("filters by id", () => {
    const preNote = [
        {
            title: "Landing Page",
            text: "link to a notes page",
            id: "2",
        },
        {
            title: "Existing Notes",
            text: "listed on the left",
            id: "3",
        },
    ]
    const result = findById("3", preNote);
    expect(result.title).toBe("Existing Notes");
});

test("validates text", () => {
    const note = {
        title: "Landing Page",
        text: "link to a notes page",
        id: "2",
    };
    const invalidNote = {
        title: 3,
        text: "listed on the left",
        id: "3",
    };
    const result = validateNote(note);
    const result2 = validateNote(invalidNote);

    expect(result).toBe(true);
    expect(result2).toBe(false);
});

test("deletes note", () => {
    const preNote = [
        {
            title: "Landing Page",
            text: "link to a notes page",
            id: "2",
        },
        {
            title: "Existing Notes",
            text: "listed on the left",
            id: "3",
        },
    ]
    const result = deleteNote("2", preNote);

    expect(result.length).toBe(1);
})

