const { Pool, Client } = require('pg')
const connectionString = 'postgresql://postgres:cpe@localhost:5432/meetinride'

module.exports = {

    addMatch: function (data, callback) {
        const pool = new Pool({
            connectionString: connectionString,
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
            connectionString: connectionString,
        })

        pool.connect(function (err, client, done) {
            let query = "SELECT second_username, date FROM matchs WHERE first_username = $1";
            let userdetails = [data.username];

            client.query(query, userdetails, function (err, result) {
                done();
                callback(result.rows);
            });
        })
        pool.end()
    },
}