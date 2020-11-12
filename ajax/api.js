
//connection à la BDD
const mysql= require('mysql');
const db = mysql.createConnection({
  host     : 'localhost',
  user     : '****',
  password : '****',
  database : 'movies'
});

db.connect(function(err) {
   if (err) throw err;
   console.log("Connecté à la base de données MySQL!");
 });

///ajouter fonction erreur

//importation du framework
const express = require('express')
const app = express()
const port = 3000


var path = require('path');


app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});




app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})//a mettre qu'une seule fois


//réaliser les routes
app.get('/api/movies', (req, res) => {
    req = db.query("SELECT * FROM movies LIMIT 20 ", function (err, result) {
    if (err) throw err;
    res.json(result);
    })
}); 

app.get('/api/movies/:id', (req, res) => {
    var test = req.params.id; 
    req = db.query("SELECT * FROM movies WHERE id = ?",[test], function (err, result) {
    if (err) throw err;
    res.json(result);
    })
}); 

app.get('/api/movies/:id/genres', (req, res) => {
    var test = req.params.id; 
    req = db.query("SELECT genres.name FROM genres INNER JOIN movies ON movies.genre_id = genres.id WHERE movies.id = ?",[test], function (err, result) {
    if (err) throw err;
    res.json(result);
    })
}); 

app.get('/api/movies/:id/producers', (req, res) => {
    var test = req.params.id; 
    req = db.query("SELECT * FROM producers INNER JOIN movies ON movies.producer_id = producers.id WHERE movies.id = ?",[test], function (err, result) {
    if (err) throw err;
    res.json(result);
    })
}); 

