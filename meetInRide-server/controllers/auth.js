const { Pool, Client } = require('pg');
const config = require('../config/db');
var md5 = require('md5');
var jwt = require('jsonwebtoken');

module.exports = {

    isAuth: function (request, response, next) {
        module.exports.isAuthenticated(request, response, (result) => {
            if (result.length > 0)
                next();
        });
    },

    isAuthenticated: function (request, response, callback) {
        const pool = new Pool({
            connectionString: config.connectionString,
        })

        pool.connect(function (err, client, done) {
            let query = "SELECT * FROM users WHERE token = $1";
            let userdetails = [request.headers.authorization];

            client.query(query, userdetails, function (err, res) {
                done();

                callback(res.rows);
            });
        })
        pool.end()
    },

    login: function (data, existingToken, callback) {
        const pool = new Pool({
            connectionString: config.connectionString,
        })

        pool.connect(function (err, client, done) {
            let query = "UPDATE users SET token = $3 WHERE username = LOWER($1) AND password = $2 RETURNING users.*";
            let password = md5(data.password + md5((data.username).toLowerCase()));
            let token = (existingToken == "") ? jwt.sign({ username: data.username }, 'SECRET_MIR_KEY') : existingToken;
            let userdetails = [data.username, password, token];

            client.query(query, userdetails, function (err, res) {
                let result = (res.rowCount == 1) ? res.rows : null;
                
                done();
                callback(result);
            });
        })
        pool.end()
    },

    logout: function (data, callback) {
        const pool = new Pool({
            connectionString: config.connectionString,
        })

        pool.connect(function (err, client, done) {
            let userdetails = [data.username];
            
            client.query('BEGIN');
            client.query("UPDATE users SET token = NULL WHERE username = LOWER($1)", userdetails);
            client.query("DELETE FROM positions WHERE username = LOWER($1)", userdetails);
            client.query('COMMIT', function () {
              done()
              callback(true);
            });
        })
        pool.end()
    },

    signup: function (data, callback) {
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
