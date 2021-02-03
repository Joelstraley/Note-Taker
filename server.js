// Dependencies
var express = require("express"); 
var path = require('path');
var notes = require("./db/db.json");
var fs = require("fs");

var app = express();
var PORT = 3010;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join("assets/css")))
app.use(express.static(path.join("assets/js")))

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "/notes.html"));
  });

app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "/index.html"));
  });
  
 app.get("/api/notes", function(req, res) { 
    return res.json(notes);
  });

  

 app.post("/api/notes", function(req, res) {
  fs.readFile('db.json', function (err, data) {
    if (err) throw err;   
    let notesArray = []
    JSON.parse(data);
    req.body.id = data.length;
    notesArray.push(req.body);
    fs.writeFile("./db/db.json", JSON.stringify(data), 
    function(err){
       if (err) throw err;
       console.log('success');
     });
    res.json(JSON.parse(data));
    })
});

app.delete("/api/notes/:id", function(req, res) {
   fs.readFile("./db/db.json", function (err, data) {
    if (err) throw err; 
    data = JSON.parse(data);
    data.filter(function(note) {
      return note.id !== parseInt(req.params.id);
    });
    fs.writeFile("./db/db.json", JSON.stringify(data), 
    function(err){
       if (err) throw err;
       console.log('success');
     });
    res.json(JSON.parse(data));
    })
});

  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
