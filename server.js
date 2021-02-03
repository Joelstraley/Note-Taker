// Dependencies
var express = require("express"); 
var path = require('path');
var notes = require("./db/db.json");
var fs = require("fs");

var app = express();
var PORT = 3010;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join("public")))

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
  });

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
  });
  
 app.get("/api/notes", function(req, res) { 
  console.log(notes);
    return res.json(notes);
  });

 app.post("/api/notes", function(req, res) {
    console.log("in the api function");
    rawdata = fs.readFileSync("./db/db.json") 
    console.log(rawdata);
    let data = JSON.parse(rawdata);
    console.log(data);
    let notesArray = data;
    req.body.id = data.length;
    notesArray.push(req.body);
    console.log(notesArray);
    fs.writeFile("./db/db.json", JSON.stringify(notesArray), 
    function(err){
       if (err) throw err;
       console.log('success');
     });
    res.json(data)
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
