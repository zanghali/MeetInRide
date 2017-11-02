var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var auth = require('./controllers/auth');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
    secret: 'APP-SECRET',
    resave: true,
    saveUninitialized: true
}));
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8100');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});

app.get('/auth', function (request, response) {
    var result = false;

    if (auth.isAuthenticated)
        result = true;

    response.send(result);
})

app.post('/login', function (request, response) {
    auth.findUser(request.body, (result) => {
        request.session.user_id = request.body.username;
        response.send(result);
    })
})

app.get('/logout', auth.isAuthenticated, function (request, response) {
    request.session.destroy();
});

app.post('/signup', function (request, response) {
    auth.registerUser(request.body, (result) => {
        response.send(result);
    })
})

app.listen(3000);