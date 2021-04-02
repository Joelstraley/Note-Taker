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
    return res.json(getJSON());
  });

 app.post("/api/notes", function(req, res) {
    const notesArray = getJSON();
    let newNote = req.body;
    newNote.id = data.length -1;
    notesArray.push(newNote);
    fs.writeFile("./db/db.json", JSON.stringify(notesArray), 
    "UTF-8")
    function(err){
       if (err) throw err;
       console.log('success');
     });
    res.json(newNote) 
    });

app.delete("/api/notes/:id", function(req, res) {
  //Difference between fs.readFileSync("./db/db.json"); and getJSON() ? //
  const removedNote = req.params.id;
 /*  const rawdata = fs.readFileSync("./db/db.json"); */
   const notes = getJSON();
   const id = parseInt(removedNote);
   console.log(data);
   data = data.filter((note) => note.id != data);
   const newData = fs.writeFile("./db/db.json", JSON.stringify(data), 
   function(err){
      if (err) throw err;
      console.log('success');
    });
   res.json(newData);
  });



  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
