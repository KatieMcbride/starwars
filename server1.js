// Dependencies
// ===========================================================
var express = require("express");

var app = express();
var PORT = process.env.PORT || 3000;
const path = require("path");


//set up teh express app to handle data parsing
app.use(express.urlencoded({ extend : true }));
app.use(express.json());

// Data
// ===========================================================
const characters = [
  {
    routeName: "yoda",
    name: "Yoda",
    role: "Jedi Master",
    age: 900,
    forcePoints: 2000
  },
  {
    routeName: "darthmaul",
    name: "Darth Maul",
    role: "Sith Lord",
    age: 200,
    forcePoints: 1200
  }
];


// Routes
// ===========================================================
// General route
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, 'view.html'));
});

// Add route
app.get("/add", function(req, res) {
  res.sendFile(path.join(__dirname, 'add.html'));
});

// Get all the data
app.get('/api/characters', (req, res) =>{
  return res.json(characters);
});

// Get one object from data
app.get('/api/characters/:character', (req,res) => {
  const chosen = req.params.character;

  const chosenOne = characters.filter(obj => {
    return obj.routeName === chosen;
});

if(chosenOne.length){
  return res.json(chosenOne[0]);
}
return res.send('character, I do not see');  

});

// Add an object to the data
app.post('/api/characters', (req, res) =>{
  const newCharacter = req.body;
  console.log(newCharacter);

  newCharacter.routeName = newCharacter.name.replace(/\s+/g,'').toLowerCase();

  // add new character to database
  characters.push(newCharacter);

  // send back what I just added
  res.json(newCharacter);
}); 



// Listener
// ===========================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
