let mysql = require('mysql');
const config = require("./config.json");

module.exports = {
    createDbConnect: function ()
{
    let connection = mysql.createConnection(
        {
            host: config.db_host,
            user: config.db_user,
            password: config.db_password,
            database: config.db_database,
            multipleStatements: true
        }
    );
    connection.connect(function (err) {
        if (err) throw err;
        console.log("Database connected");
    });
    return connection;
}
};