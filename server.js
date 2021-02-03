// Dependencies
const express = require("express"); 
const path = require("path");
const notes = require("./db/db.json");
const fs = require("fs");

const app = express();
const PORT = 3000;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
/* app.use(express.static("Note-Taker"));
 */ 

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
    let data = []
    data = JSON.parse(data);
    req.body.id = data.length;
    data.push(req.body);
    data = JSON.stringify(data);
    fs.writeFile("db.json", JSON.stringify(data), 
    function(err){
       if (err) throw err;
       console.log('success');
     });
    res.json(JSON.parse(data));
    })
});

app.delete("/api/notes/:id", function(req, res) {
   fs.readFile('db.json', function (err, data) {
    if (err) throw err; 
    data = JSON.parse(data);
    data.filter(function(note) {
      return note.id !== parseInt(req.params.id);
    });
    data = JSON.stringify(data);
    fs.writeFile("db.json", JSON.stringify(data), 
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
