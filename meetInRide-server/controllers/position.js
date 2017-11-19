const { Pool, Client } = require('pg');
const config = require('../config/db');

module.exports = {

    updatePosition: function (data, callback) {
        const pool = new Pool({
            connectionString: config.connectionString,
        })

        pool.connect(function (err, client, done) {
            let query = "INSERT INTO positions VALUES (LOWER($1), $2, $3) ON CONFLICT (username) DO UPDATE SET latitude = $2, longitude = $3";
            let userdetails = [data.username, data.latitude, data.longitude];

            client.query(query, userdetails, function (err, result) {
                done();
                callback(true);
            });
        })
        pool.end()
    },
    
    getPositions: function (data, callback) {
        const pool = new Pool({
            connectionString: config.connectionString,
        })

        pool.connect(function (err, client, done) {
            let query = "SELECT u.username, u.surname, u.lastname, u.birthdate, u.email, p.latitude, p.longitude FROM users u LEFT JOIN positions p ON u.username = p.username";
            let userdetails = [/* data.sexe */];

            client.query(query, userdetails, function (err, result) {
                done();
                callback(result.rows);
            });
        })
        pool.end()
    },
}