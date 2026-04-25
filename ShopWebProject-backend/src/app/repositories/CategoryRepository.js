const pool = require('../../config/db');
const Category = require('../models/Category');

class CategoryRepository {
    async getAllRepo() {
        try {
            const result = await pool.query(
                'SELECT * FROM categories'
            );
            return result.rows.map(
                row => new Category(
                    row.categoryid, 
                    row.categoryname
                )
            );
        } catch(error) {
            console.log(`SQL ERROR: ${error}`);
            return error;
        }
    }

    async getIdRepo(id) {
        try {
            const result = await pool.query(
                'SELECT * FROM categories WHERE categoryid = $1',
                [id]
            );

            const row = result.rows[0];

            if (!row) {
                return null;
            }

            return new Category(
                row.categoryid, 
                row.categoryname
            );
        } catch(error) {
            console.log(`SQL ERROR: ${error}`);
            return [];
        }
    }

    async createRepo(name) {
        try {
            const result = await pool.query(
                `INSERT INTO categories (categoryname)
                VALUES ($1)
                RETURNING *`,
                [name]
            );

            const row = result.rows[0];

            return new Category(
                row.categoryid, 
                row.categoryname
            );
        } catch(error) {
            console.log(`SQL ERROR: ${error}`);
            return [];
        }
    }

    async deleteRepo(id) {
        try {
            const result = await pool.query(
                'DELETE FROM categories WHERE categoryid = $1',
                [id]
            );
            return { success: true, message: `Category with id=${id} deleted!` };
        } catch(error) {
            console.log(`SQL ERROR: ${error}`);
            return [];
        }
    }

    async updateRepo(id, name) {
        try {
            const result = await pool.query(
                `UPDATE categories
                SET categoryname = $1
                WHERE categoryid = $2
                RETURNING *`,
                [name, id]
            );
            return result.rows.map(
                row => new Category(
                    row.categoryid, 
                    row.categoryname
                )
            );        
        } catch(error) {
            console.log(`SQL ERROR: ${error}`);
            return [];
        }
    }
}

module.exports = new CategoryRepository();
