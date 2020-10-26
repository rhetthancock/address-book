const connector = require('./mysql-connector');

/**
 * Provides MySQL context for database queries and transactions
 */
class MySQLWrapper {
    /**
     * Gets a new connection to the database from the pool
     * @return {Promise} - Promise to provide a new connection
     */
    static getConnection() {
        return new Promise((resolve, reject) => {
            connector.pool.getConnection((error, connection) => {
                if(error) {
                    reject(error);
                }
                return resolve(connection);
            });
        });
    }
    /**
     * Runs a query on the database
     * @param {String} sql - SQL query to be executed
     * @param {Array} params - Parameters to be passed into the query
     * @return {Promise} - Promise to run the query on the database and return results
     */
    static createQuery({sql, params}) {
        return new Promise((resolve, reject) => {
            connector.pool.getConnection((error, connection) => {
                if(error) {
                    return reject(error);
                }
                connection.query(sql, params, (error, rows) => {
                    if(error) {
                        return reject(error);
                    }
                    return resolve(rows);
                });
            });
        });
    }
    /**
     * Runs the transactional query on the database
     * @param {String} sql - SQL query to be executed
     * @param {Array} params - Parameters to be passed into the query
     * @param {MySQL.Connection} connection - Connection to database from pool
     * @return {Promise} - Promise to run transactional query and return results
     */
    static createTransaction({sql, params, connection}) {
        return new Promise((resolve, reject) => {
            connection.query(sql, params, (error, rows) => {
                if(error) {
                    return reject(error);
                }
                return resolve(rows);
            })
        });
    }
    /**
     * Commits a transaction to the database
     * @param {MySQL.Connection} connection - Connection with transaction to be committed
     * @return {Promise} - A promise to commit the transaction
     */
    static commit(connection) {
        return new Promise((resolve, reject) => {
            try {
                connection.commit(err => {
                    if(error) {
                        return rollback(connection, error);
                    }
                    return resolve();
                })
            }
            catch(error) {
                return reject(error);
            }
            finally {
                connection.release();
            }
        });
    }
    /**
     * Rolls back the database from the provided connection's transaction
     * @param {MySQL.Connection} connection - Connection to be rolled back
     * @returns {Promise} - A promise to rollback
     */
    static rollback(connection) {
        return new Promise((resolve, reject) => {
            try {
                connection.rollback(() => resolve());
            }
            catch(error) {
                return reject(error);
            }
            finally {
                connection.release();
            }
        });
    }
    /**
     * Starts a new database transaction in the provided connection
     * @param {MySQL.Connection} connection - Database connection from pool
     * @returns {Promise} - A promise to start the transaction
     */
    static startTransaction(connection) {
        return new Promise((resolve, reject) => {
            connection.beginTransaction(error => {
                if(error) {
                    reject(error);
                }
                return resolve(connection);
            })
        });
    }
}

module.exports = MySQLWrapper;