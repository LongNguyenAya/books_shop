const pool = require('../../config/db');
const Product = require('../models/Product');

class ProductRepository {
    async getAllRepo(page = 1, limit = 15) {
        try {
            const offset = (page - 1) * limit;

            const result = await pool.query(
                `SELECT p.*, c.categoryname
                FROM products p
                JOIN categories c
                ON p.categoryid = c.categoryid
                LIMIT $1 OFFSET $2`,
                [limit, offset]
            );

            const totalResult = await pool.query(
                `SELECT COUNT(*) FROM products`
            );

            const total = parseInt(totalResult.rows[0].count);
            
            return {
                data: result.rows.map(
                    row => new Product(
                        row.productid, 
                        row.productname, 
                        row.description, 
                        row.imageurl,
                        row.price,
                        row.quantity, 
                        row.categoryid, 
                        row.categoryname
                    )
                ),
                total,
                totalPages: Math.ceil(total / limit),
                page
            };
        } catch(error) {
            console.log(`SQL ERROR: ${error}`);
            return [];
        }
    }

    async getIdRepo(id, client=null) {
        try {
            const executor = client || pool;

            const result = await executor.query(
                `SELECT p.*, c.categoryname
                FROM products p
                JOIN categories c
                ON p.categoryid = c.categoryid
                WHERE p.productid = $1`,
                [id]
            );

            const row = result.rows[0];

            if (!row) {
                return null;
            }

            return new Product(
                row.productid, 
                row.productname, 
                row.description, 
                row.imageurl,
                row.price,
                row.quantity, 
                row.categoryid, 
                row.categoryname
            );
        } catch(error) {
            console.log(`SQL ERROR: ${error}`);
            return [];
        }
    }

    async createRepo(name, description, imageurl, price, quantity, categoryid) {
        try {
            const result = await pool.query(
                `INSERT INTO products
                (productname, description, imageurl, price, quantity, categoryid)
                VALUES ($1,$2,$3,$4,$5,$6)
                RETURNING *`,
                [name, description, imageurl, price, quantity, categoryid]
            );

            const row = result.rows[0];

            return new Product(
                row.productid, 
                row.productname, 
                row.description,
                row.imageurl,
                row.price, 
                row.quantity, 
                row.categoryid
            );
        } catch(error) {
            console.log(`SQL ERROR: ${error}`);
            return [];
        }
    }

    async deleteRepo(id) {
        try {
            const result = await pool.query(
                `DELETE FROM products
                WHERE productid = $1`,
                [id]
            );
            return { success: true, message: `Product with id=${id} deleted!` };
        } catch(error) {
            console.log(`SQL ERROR: ${error}`);
            return [];
        }
    }

    async updateRepo(id, name, description, imageurl, price, quantity, categoryid) {
        try {
            const result = await pool.query(
                `UPDATE products
                SET productname=$1,
                    description=$2,
                    imageurl=$3,
                    price=$4,
                    quantity=$5,
                    categoryid=$6,
                    updatedat=NOW()
                WHERE productid=$7
                RETURNING *`,
                [name, description, imageurl, price, quantity, categoryid, id]
            );

            const row = result.rows[0];

            return new Product(
                row.productid, 
                row.productname, 
                row.description,
                row.imageurl,
                row.price, 
                row.quantity, 
                row.categoryid
            );      
        } catch(error) {
            console.log(`SQL ERROR: ${error}`);
            return [];
        }
    }

    async caculateTotalProductsRepo() {
        try {
            const result = await pool.query(
                `SELECT COUNT(*) FROM products`
            );

            return parseInt(result.rows[0].count, 10);
        } catch(error) {
            console.log(`SQL ERROR: ${error}`);
            return [];
        }
    }
}

module.exports = new ProductRepository();