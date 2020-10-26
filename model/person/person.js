const DAO = require('../../db/dao');
const mysql = require('../../db/mysql-wrapper');

/**
 * Represents a person object in the database
 */
class Person extends DAO {
    /**
     * Provides context for which table to be used
     */
    static get TABLE_NAME() {
        return 'persons';
    }

    /**
     * Returns a person from the database by id
     * @param {Number} id - ID of the row to be returned
     */
    static async getByID(_, {id}) {
        return await this.find(id);
    }

    /**
     * Returns a list of persons matching the specified fields
     * @param {Object} fields - Fields to be used to retreive results
     */
    static async findMatching(_, fields) {
        // Return all results if no fields specified
        if(Object.keys(fields).length === 0) {
            return this.findAll();
        }
        return this.findByFields({fields});
    }

    /**
     * Adds a new person to the database
     * @param {Object} fields - Person fields to be inserted into the database
     */
    static async createEntry(_, {firstName, lastName, email, phone, role}) {
        const connection = await mysql.getConnection();
        try {
            let result = await this.insert(connection, {
                fields: {
                    firstName,
                    lastName,
                    email,
                    phone,
                    role
                }
            });
            return this.getByID(_, {id: result.insertId});
        }
        finally {
            if(connection != null) {
                connection.release();
            }
        }
    }

    /**
     * Updates a person in the database
     * @param {Number} id - ID of row to be updated
     * @param {Object} fields - Object containing fields to be updated 
     */
    static async updateEntry(_, {id, firstName, lastName, email, phone, role}) {
        const connection = await mysql.getConnection();
        try {
            let result = await this.update(connection, {
                id,
                fields: {
                    firstName,
                    lastName,
                    email,
                    phone,
                    role
                }
            });
            return this.getByID(_, {id});
        }
        finally {
            if(connection != null) {
                connection.release();
            }
        }
    }

    /**
     * Deletes the specified person from the database
     * @param {Number} id - ID of the entry to be deleted 
     */
    static async deleteEntry(_, {id}) {
        const connection = await mysql.getConnection();
        try {
            let results = await this.delete(connection, id);
            return {affectedRows: results.affectedRows};
        }
        finally {
            if(connection != null) {
                connection.release();
            }
        }
    }
}

module.exports = Person;