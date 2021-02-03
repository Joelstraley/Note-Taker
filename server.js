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
var id = 0;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Basic route that sends the user first to the AJAX Page
app.get("/notes", function(req, res) {
  ///possibly read file 
    res.sendFile(path.join(__dirname, "/notes.html"));
  });

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "/index.html"));
  });
  
 app.get("/api/notes", function(req, res) { 
    return res.json(notes);
  });


app.post("/api/notes", function(req, res) {
  
  fs.readFile('db.json', function (err, data) {
    var notes = JSON.parse(data);
    //      _------- add expArray
    json.expArray.push(newNote);
    console.log(json);
    fs.writeFile("expenses.json", JSON.stringify(exp), 
    function(err){
       if (err) throw err;
       console.log('sucess');
     });

    res.json(newNote);
  });

   




  
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });

