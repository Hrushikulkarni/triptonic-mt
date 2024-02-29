var createError = require('http-errors');
var express = require('express');
var path = require('path');
var app = express();

const cors = require('cors');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// CORS settings
app.use(cors());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested, Content-Type, Accept, Authorization"
    );
    if(req.method === "OPTIONS") {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
})

app.use('/', require('./main-app/routes'));

// env value PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server stared on ${PORT}`));

module.exports = app;
