const mysql = require('./mysql-wrapper');

/**
 * Represents database access object
 */
class DAO {
    /**
     * Can be overwritten by subclasses when primary key is different than 'id'
     */
    static get PRIMARY_KEY() {
        return 'id';
    }

    /**
     * Returns the specified entry from the database
     * @param {Number} id - ID of row to be returned
     */
    static async find(id) {
        return (await mysql.createQuery({
            sql: `SELECT * FROM ?? WHERE ?? = ? LIMIT 1;`,
            params: [this.TABLE_NAME, this.PRIMARY_KEY, id]
        })).shift();
    }

    /**
     * Returns all entries from the database table
     */
    static async findAll() {
        return await mysql.createQuery({
            sql: `SELECT * FROM ??;`,
            params: [this.TABLE_NAME]
        });
    }

    /**
     * Returns all entries by the specified fields
     * @param {Object} fields - The fields to be updated
     */
    static findByFields({fields}) {
        let sql = `SELECT * FROM ?? WHERE `;
        let params = [this.TABLE_NAME];

        // Construct WHERE clause by chaining 'key = value AND ...'
        Object.keys(fields).foreach((key, index) => {
            sql += `${key} = ? `;
            params.push(fields[key]);
            if(index + 1 == Object.keys(fields).length) {
                sql += ' AND ';
            }
        });
        sql += ';';

        return mysql.createQuery(sql, params);
    }

    /**
     * Inserts the specified fields into a new database row
     * @param {MySQL.Connection} connection - Connection to database from pool
     * @param {Object} fields - Object containing fields to be inserted
     */
    static insert(connection, {fields}) {
        return mysql.createTransaction({
            sql: `INSERT INTO ?? SET ?`,
            params: [this.TABLE_NAME, fields],
            connection
        });
    }

    /**
     * Updates the specified row with specified field changes
     * @param {MySQL.Connection} connection - Connection to database from pool
     * @param {Number} id - ID of row to be updated
     * @param {Object} fields - Object containing fields to be updated
     */
    static update(connection, {id, fields}) {
        return mysql.createTransaction({
            sql: `UPDATE ?? SET ? WHERE ?? = ?;`,
            params: [this.TABLE_NAME, fields, this.PRIMARY_KEY, id],
            connection
        });
    }

    /**
     * Removes the specified row from the database
     * @param {MySQL.Connection} connection - Connection to database from pool
     * @param {Number} id - ID of row to be removed
     */
    static delete(connection, id) {
        return mysql.createTransaction({
            sql: `DELETE FROM ?? WHERE ?? = ?`,
            params: [this.TABLE_NAME, this.PRIMARY_KEY, id],
            connection
        });
    }
}

module.exports = DAO;