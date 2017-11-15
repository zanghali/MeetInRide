var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var auth = require('./controllers/auth');
var position = require('./controllers/position');
var match = require('./controllers/match');
// var helmet = require('helmet') // TODO

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Token');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
// app.use(helmet()) // TODO

// Authentication

app.get('/auth', function (request, response) {
    auth.isAuthenticated(request, response, (result) => {
        response.send(result);
    })
});

app.post('/login', function (request, response) {
    auth.logUser(request.body, request.headers.token, (result) => {
        response.send(result);
    })
});

app.get('/logout', auth.isAuthenticated, function (request, response) {
    // request.session.destroy();
    response.send("destroyed");
});

app.post('/signup', function (request, response) {
    auth.registerUser(request.body, (result) => {
        response.send(result);
    })
});

// Position

app.post('/updatePosition', function (request, response) {
    position.updatePosition(request.body, (result) => {
        response.send(result);
    })
});

app.get('/getPositions', function (request, response) {
    position.getPositions(request.body, (result) => {
        response.send(result);
    })
});

// Match

app.post('/addMatch', function (request, response) {
    match.addMatch(request.body, (result) => {
        response.send(result);
    })
});

app.post('/getMatchsByUsername', function (request, response) {
    match.getMatchsByUsername(request.body, (result) => {
        response.send(result);
    })
});

app.listen(3000);