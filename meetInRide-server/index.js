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
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,authorization');
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
    auth.login(request.body, request.headers.authorization, (result) => {
        response.send(result);
    })
});

app.post('/logout', auth.isAuth, function (request, response) {
    auth.logout(request.body, (result) => {
        response.send("destroyed");
    })
});

app.post('/signup', function (request, response) {
    auth.signup(request.body, (result) => {
        response.send(result);
    })
});

// Position

app.post('/updatePosition', auth.isAuth, function (request, response) {
    position.updatePosition(request.body, (result) => {
        response.send(result);
    })
});

app.get('/getPositions', auth.isAuth, function (request, response) {
    position.getPositions(request.body, (result) => {
        response.send(result);
    })
});

// Match

app.post('/addMatch', auth.isAuth, function (request, response) {
    match.addMatch(request.body, (result) => {
        response.send(result);
    })
});

app.post('/getMatchsByUsername', auth.isAuth, function (request, response) {
    match.getMatchsByUsername(request.body, (result) => {
        response.send(result);
    })
});

app.listen(3000);