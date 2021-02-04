// Dependencies
var express = require("express"); 
var path = require('path');
var notes = require("./db/db.json");
var fs = require("fs");

var app = express();
var PORT = process.env.port || 3000; 


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
    return res.json(notes);
  });

 app.post("/api/notes", function(req, res) {
    rawdata = fs.readFileSync("./db/db.json");
    let data = JSON.parse(rawdata);
    let notesArray = data;
    req.body.id = data.length;
    notesArray.push(req.body);
    let newData = JSON.stringify(notesArray);
    fs.writeFile("./db/db.json", newData, 
    function(err){
       if (err) throw err;
       console.log('success');
     });
    res.json(newData) 
    });

app.delete("/api/notes/:id", function(req, res) {
  let removedNote = req.params.id;
  console.log(removedNote);
  let rawdata = fs.readFileSync("./db/db.json");
   let data = JSON.parse(rawdata);
   console.log(data);
   data = data.filter((note) => note.id != removedNote);
   let newData = fs.writeFile("./db/db.json", JSON.stringify(data), 
   function(err){
      if (err) throw err;
      console.log('success');
    });
   res.json(newData);
  });



  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
