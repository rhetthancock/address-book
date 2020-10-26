const mysql = require('mysql');

/**
 * Creates a connection to the MySQL Database
 */
class MySQLConnector {
    constructor() {
        this.connectionPool = mysql.createPool({
            host: 'localhost',
            user: 'root',
            password: 'password',
            database: 'address_book',
            connectionLimit: 10
        });
    }
    get pool() {
        return this.connectionPool;
    }
}

module.exports = new MySQLConnector();