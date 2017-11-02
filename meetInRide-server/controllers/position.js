const { Pool, Client } = require('pg')
const connectionString = 'postgresql://postgres:Ghali01710721@localhost:5432/meetinride'

module.exports = {

    updatePosition: function (data, callback) {
        const pool = new Pool({
            connectionString: connectionString,
        })

        pool.connect(function (err, client, done) {
            let query = "UPDATE positions SET latitude = $2 , longitude = $3 WHERE username = $1";
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
            connectionString: connectionString,
        })

        pool.connect(function (err, client, done) {
            let query = "SELECT u.username, p.latitude, p.longitude FROM users u LEFT JOIN positions p ON u.username = p.username";
            let userdetails = [/* data.sexe */];

            client.query(query, userdetails, function (err, result) {
                done();
                callback(result.rows);
            });
        })
        pool.end()
    },
}