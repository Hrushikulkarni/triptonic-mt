var createError = require('http-errors');
var express = require('express');
var path = require('path');

var app = express();

app.use('/', require('./main-app/routes'));

// env value PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server stared on ${PORT}`));

module.exports = app;
