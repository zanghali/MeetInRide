const { Pool, Client } = require('pg');
const config = require('../config/db');
var md5 = require('md5');
var jwt = require('jsonwebtoken');

module.exports = {

    isAuthenticated: function (request, response, callback) {
        const pool = new Pool({
            connectionString: config.connectionString,
        })

        pool.connect(function (err, client, done) {
            let query = "SELECT * FROM users WHERE token == $1";
            let userdetails = [request.headers.token];

            client.query(query, userdetails, function (err, res) {
                done();
                callback(res.rowCount > 0);
            });
        })
        pool.end()
    },

    logUser: function (data, existingToken, callback) {
        const pool = new Pool({
            connectionString: config.connectionString,
        })

        pool.connect(function (err, client, done) {
            let query = "UPDATE users SET token = $3 WHERE username = LOWER($1) AND password = $2";
            let password = md5(data.password + md5((data.username).toLowerCase()));
            let token = (existingToken == "") ? jwt.sign({ username: data.username }, 'SECRET_MIR_KEY') : existingToken;
            let userdetails = [data.username, password, token];

            client.query(query, userdetails, function (err, res) {
                let result = (res.rowCount == 1) ? token : null;

                done();
                callback(result);
            });
        })
        pool.end()
    },

    registerUser: function (data, callback) {
        const pool = new Pool({
            connectionString: config.connectionString,
        })

        pool.connect(function (err, client, done) {
            let query = "INSERT INTO users (username,email,password,surname,lastname,birthdate) VALUES (LOWER($1),$2,$3,$4,$5,$6);";
            let password = md5(data.password + md5((data.username).toLowerCase()));
            let userdetails = [data.username, data.email, password, data.surname, data.lastname, data.birthdate];

            client.query(query, userdetails, function (err, result) {
                done();
                callback(true);
            });
        })
        pool.end()
    }
}