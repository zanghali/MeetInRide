const { Pool, Client } = require('pg')
const connectionString = 'postgresql://postgres:Ghali01710721@localhost:5432/meetinride'

module.exports = {

    isAuthenticated: function (request, response) {
        var result = false;

        if (request.session.user_id != undefined)
            result = true;

        console.log("(isAuth) user_id: " + request.session.user_id);

        return result;
    },

    findUser: function (data, callback) {
        const pool = new Pool({
            connectionString: connectionString,
        })

        pool.connect(function (err, client, done) {
            let query = "SELECT * FROM users WHERE LOWER(username) = LOWER($1) AND LOWER(password) = LOWER($2)";
            let userdetails = [data.username, data.password];

            client.query(query, userdetails, function (err, result) {
                done();
                callback(result.rows);
            });
        })
        pool.end()
    },

    registerUser: function (data, callback) {
        const pool = new Pool({
            connectionString: connectionString,
        })

        pool.connect(function (err, client, done) {
            let query = "INSERT INTO users (username,email,password,surname,lastname,birthdate) VALUES ($1,$2,$3,$4,$5,$6);";
            let userdetails = [data.username, data.email, data.password, data.surname, data.lastname, data.birthdate];

            client.query(query, userdetails, function (err, result) {
                done();
                callback(true);
            });
        })
        pool.end()
    }
}