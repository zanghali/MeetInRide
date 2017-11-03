var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var auth = require('./controllers/auth');
var position = require('./controllers/position');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({secret: 'APP-SECRET', cookie: {httpOnly: true, secure: true}}))
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

// Authentication

app.get('/auth', function (request, response) {
    var result = auth.isAuthenticated(request, response);
    response.send(result);
});

app.post('/login', function (request, response) {
    auth.findUser(request.body, (result) => {
        request.session.user_id = request.body.username;
        console.log("(login) user_id: " + request.session.user_id);
        response.send(result);
    })
});

app.get('/logout', auth.isAuthenticated, function (request, response) {
    request.session.destroy();
    response.send("destroyed");
});

app.post('/signup', function (request, response) {
    auth.registerUser(request.body, (result) => {
        response.send(result);
    })
});

// Geolocation

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

app.listen(3000);