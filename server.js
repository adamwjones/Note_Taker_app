// Dependencies
// =============================================================

const express = require("express"); // Required based on HW Discription 
const fs = require("fs"); // Required based on HW Discription
const path = require("path"); //Activity StarWars -> Not sure this is needed


// Express and Heroku ports
// =============================================================






// HTML Routes
// =============================================================

// GET `/notes` 
    // Return the `notes.html` file

// GET `*` 
    //Return the `index.html` file


// API Routes
// =============================================================

// GET `/api/notes` 
    // Should read the `db.json` file
    // Return all saved notes as JSON

// POST `/api/notes` 
    // Receive a new note to save on the request body
    // Add new note to the `db.json` file
    // Return the new note to the client

// DELETE `/api/notes/:id` 

    // Should receive a query parameter containing the id of a note to delete
    // Give each note a unique `id` when it's saved 
    // Read all notes from the `db.json` file 
    // Remove the note with the given `id` property 
    // Rewrite the notes to the `db.json` file

