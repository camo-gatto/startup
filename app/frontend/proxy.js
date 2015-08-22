var express = require('express');
var app = express();

app.get('/hello', function (req, res) {
  res.send('Hello World!');
});

app.use('/static', express.static('./'));


module.exports = app;