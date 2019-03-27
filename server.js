var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var app = express();

app.use(bodyParser.json());

app.get('/getNote', function(req, res) {
  fs.readFile('./test.json', 'utf-8', function(err, data) {
    if (err) throw err;
    var stringifyFile = data;
    res.send(data);
  });
});

app.post('/updateNote/:note', function(req, res) {
  fs.readFile('./test.json', 'utf-8', function(err, data) {
    if (err) throw err;
    fs.writeFile('./test.json', data + '\n' + req.params.note, function(err) {
      if (err) throw err;
      console.log('File updated');
    });
  });
});

app.use(function(req, res, next) {
  res.status(404).send('Wybacz, nie mogliśmy odnaleźć tego, czego żądasz!');
});

var server = app.listen(3000, function() {
  console.log('Przykładowa aplikacja nasłuchuje na http://localhost:3000');
});
