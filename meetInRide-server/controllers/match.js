const { Pool, Client } = require('pg');
const config = require('../config/db');

module.exports = {

    addMatch: function (data, callback) {
        const pool = new Pool({
            connectionString: config.connectionString,
        })

        pool.connect(function (err, client, done) {
            let query = "INSERT INTO matchs (first_username,second_username,date) VALUES ($1,$2,current_timestamp)";
            let userdetails = [data.first_username, data.second_username];

            client.query(query, userdetails, function (err, result) {
                done();
                callback(true);
            });
        })
        pool.end()
    },
    
    getMatchsByUsername: function (data, callback) {
        const pool = new Pool({
            connectionString: config.connectionString,
        })

        pool.connect(function (err, client, done) {
            let query = "SELECT u.username, u.surname, u.lastname, u.birthdate, u.email, m.second_username, m.date FROM matchs m LEFT JOIN users u ON m.second_username = u.username WHERE m.first_username = $1";
            let userdetails = [data.username];

            client.query(query, userdetails, function (err, result) {
                done();
                callback(result.rows);
            });
        })
        pool.end()
    },
}