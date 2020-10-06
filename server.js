// Dependencies
// =============================================================

const express = require("express"); 
const fs = require("fs"); 
const path = require("path");
const uniqid = require('uniqid');

// Express and Heroku ports
// =============================================================

const app = express();
const PORT = process.env.PORT || 3000;

// Express app to handle data parsing
// ===========================================================
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Routes
// =============================================================

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/api/notes", function (req, res) {
    fs.readFile("./db/db.json", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }
        let notes = JSON.parse(data);
        console.log(notes);
        res.json(notes);
    });
});

app.delete("/api/notes/:id", function (req, res) {
    const id = req.params.id
    fs.readFile("./db/db.json", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }
        let notes = JSON.parse(data);
        notes = notes.filter(note => {
            return note.id != id
        })
        fs.writeFile("./db/db.json", JSON.stringify(notes), function (
            error,
            data
        ) {
            if (error) {
                return console.log(error);
            }
            console.log("works")
            res.json(notes)
        });
    });
})

app.post("/api/notes", function(req, res) {
    // Receive a new note to save on the request body  
    let newNote = req.body;
    // Each note needs a unique `id` when it's saved 
    newNote.id = uniqid();
    res.json(req.body);
    console.log(newNote);

    fs.readFile('./db/db.json', "utf8", function(err, data) {
        if (err){
            return console.log(err);
        }

        let notes = JSON.parse(data);
        notes.push(newNote);

        fs.writeFile('./db/db.json', JSON.stringify(notes), err => {
            if (err) throw err;
            return true;
        });
    });
});

app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

// Listener
// ===========================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});
