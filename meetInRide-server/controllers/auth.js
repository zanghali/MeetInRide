const { Pool, Client } = require('pg')
const connectionString = 'postgresql://postgres:cpe@localhost:5432/meetinride'
var md5 = require('md5');

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
            let query = "SELECT * FROM users WHERE username = LOWER($1) AND password = $2";
            let userdetails = [data.username, md5(data.password + md5((data.username).toLowerCase()))];

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