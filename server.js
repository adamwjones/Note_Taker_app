// Dependencies
// =============================================================

const express = require("express"); 
const fs = require("fs"); 
const path = require("path");
//const jsonfile = require('jsonfile');
const uniqid = require('uniqid');
//const file = 'Develop/db/db.json';


// Express and Heroku ports
// =============================================================

const app = express();
const PORT = process.env.PORT || 3000;

// Express app to handle data parsing
// ===========================================================
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//app.use(express.static(__dirname)); // Not 100% sure what this is
app.use(express.static("public"));

// Routes
// =============================================================

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/api/notes", function (req, res) {
    //res.sendFile(path.join(__dirname, "./db/db.json"));
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

    // Add new note to the `db.json` file -> Is this all I have to do????
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
    //res.send('DB updated');
});

app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

// Listener
// ===========================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});









// // Function to read JSON file
// // =========================================================
// jsonfile.readFile(file, function (err, obj) {
//     if (err) console.error(err)
//     console.log(obj)

//     let notes = obj;

//     // HTML Routes
//     // =============================================================

//     // GET `/notes` 
//             // (Class Notes) GET Requests is when user or browser asks the webserver to get/give you something -> The GET Request triggers the code in the server route. The server then finds the relevant HTML content and data and responds by providing HTML 
//         // Return the `notes.html` file

//     app.get("/notes", function(req, res) {
//         res.sendFile(path.join(__dirname, "Develop/public/notes.html"));
//     });

//     // GET `*` 
//             // (Class Notes) GET is when user or browser asks the webserver to get/give you something
//         //Return the `index.html` file

//     app.get("*", function(req, res) {
//         res.sendFile(path.join(__dirname, "Develop/public/index.html"));
//     });


//     // API Routes // A direction to the webserver to do a certain thing
//     // =============================================================

//     // GET `/api/notes` 
//             // (Class Notes) GET is when user or browser asks the webserver to get/give you something 

//     app.get("/api/notes", function(req, res) {
//         res.json(notes);
//     });

//         // Should read the `db.json` file
//         // Return all saved notes as JSON


//     // POST `/api/notes` 
//             // (Class Notes) A POST Request is when the user sends something to the server and asks it to save it -> The POST Request triggers the code in the server route. The server then sets the data as "saved" in the DB -> Then the "Saved" data are loaded on the saved page 

//     app.post("/api/notes", function(req, res) {
//         // Receive a new note to save on the request body  
//         let newNote = req.body;
//         // Each note needs a unique `id` when it's saved 
//         newNote.id = uniqid()
//         console.log(newNote);
//         // Add new note to the `db.json` file -> Is this all I have to do????
//         notes.push(newNote);
//         // Return the new note to the client
//         res.json(newNote);
//     });


//     // DELETE `/api/notes/:id` 
//             // (Class Notes) 
//         // Should receive a query parameter containing the id of a note to delete 
//             //(EAMPLE FROM ACTIVITIES) -> The /: lets you key off of unique character names 

//                 // app.get("/:character", function(req, res) {
//                 //     var chosen = req.params.character;
//                 //     console.log(chosen);
//                 //     res.end();
//                 // });

//         // Read all notes from the `db.json` file 

//         // Remove the note with the given `id` property 

//         // Rewrite the notes to the `db.json` file
// });
