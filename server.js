// Dependencies
// =============================================================
var express = require("express"); 
var path = require("path");
var notes = require("./db/db.json");
const fs = require("fs");
// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;
console.log(notes)

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Basic route that sends the user first to the AJAX Page
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "/notes.html"));
  });

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "/index.html"));
  });
  
 app.get("/api/notes", function(req, res) {
    return res.json(notes);
  });

app.post("/api/notes", function(req, res) {

    var newNote = req.body;

    newNote.routeName = newNote.name.trim();
  
    notes.push(newNote);
    fs.write 

/* let db = 'hello'
let localVersion = db
localVersion = localVersion + ' world'
console.log(localVersion)
db = localVersion
console.log('db', db) */


    res.json(newNote);
  });

   




  
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });