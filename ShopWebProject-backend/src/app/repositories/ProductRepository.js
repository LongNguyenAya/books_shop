const pool = require('../../config/db');
const slugify = require('../../config/slugify');
const Product = require('../models/Product');

class ProductRepository {
    async getAllRepo(page = 1, limit = 16) {
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
                        row.isbn,
                        row.sold_count,
                        row.is_active,
                        row.categoryid,
                        row.categoryname,
                        row.image_public_id,
                        row.slug
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

    async searchRepo(searchTerm, page = 1, limit = 16) {
        try {
            const offset = (page - 1) * limit;
            // Chuyển searchTerm về chữ thường để SQL chạy nhanh hơn
            const lowerSearchTerm = `%${searchTerm.toLowerCase()}%`;

            const result = await pool.query(
                `SELECT p.*, c.categoryname
                FROM products p
                JOIN categories c ON p.categoryid = c.categoryid
                WHERE LOWER(p.productname) LIKE $1 
                ORDER BY p.productid DESC 
                LIMIT $2 OFFSET $3`,
                [lowerSearchTerm, limit, offset]
            );

            // Truy vấn lấy tổng số lượng 
            const totalResult = await pool.query(
                `SELECT COUNT(*) FROM products
                WHERE LOWER(productname) LIKE $1`,
                [lowerSearchTerm]
            );

            const total = parseInt(totalResult.rows[0].count);
            
            return {
                data: result.rows.map(row => new Product(
                    row.productid,
                    row.productname,
                    row.description,
                    row.imageurl,
                    row.price,
                    row.quantity,
                    row.isbn,
                    row.sold_count,
                    row.is_active,
                    row.categoryid,
                    row.categoryname,
                    row.image_public_id,
                    row.slug
                )),
                total,
                totalPages: Math.ceil(total / limit),
                page: parseInt(page)
            };
        } catch(error) {
            console.error(`SQL ERROR in searchRepo: ${error}`); 
            throw error;
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
                row.isbn,
                row.sold_count,
                row.is_active,
                row.categoryid,
                row.categoryname,
                row.image_public_id,
                row.slug
            );
        } catch(error) {
            console.log(`SQL ERROR: ${error}`);
            return [];
        }
    }

    async createRepo(name, description, imageurl, price, quantity, categoryname) {
        try {
            const result = await pool.query(
                `INSERT INTO products
                (productname, description, imageurl, price, quantity, categoryname)
                VALUES ($1,$2,$3,$4,$5,$6)
                RETURNING *`,
                [name, description, imageurl, price, quantity, categoryname]
            );

            const row = result.rows[0];
            const finalSlug = slugify(row.productname, row.productid); 

            await pool.query(
                `UPDATE products SET slug = $1 WHERE productid = $2`,
                [finalSlug, row.productid]
            );

            return new Product({
                productid: row.productid,
                productname: row.productname,
                description: row.description,
                imageurl: row.imageurl,
                price: row.price,
                quantity: row.quantity,
                isbn: row.isbn,
                soldcount: row.soldcount,
                isactive: row.isactive,
                categoryid: row.categoryid,
                categoryname: row.categoryname,
                imagepublicid: row.imagepublicid,
                slug: finalSlug
            });
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

    async updateRepo(id, name, description, imageurl, price, quantity, categoryname) {
        try {
            const newSlug = slugify(name, id);
            const result = await pool.query(
                `UPDATE products
                SET productname=$1,
                    description=$2,
                    imageurl=$3,
                    price=$4,
                    quantity=$5,
                    categoryname=$6,
                    slug=$7,
                    updatedat=NOW()
                WHERE productid=$8
                RETURNING *`,
                [name, description, imageurl, price, quantity, categoryname, newSlug, id]
            );

            const row = result.rows[0];

            return new Product({
                productid: row.productid,
                productname: row.productname,
                description: row.description,
                imageurl: row.imageurl,
                price: row.price,   
                quantity: row.quantity,
                isbn: row.isbn,
                soldcount: row.soldcount,
                isactive: row.isactive,
                categoryid: row.categoryid,
                categoryname: row.categoryname,
                imagepublicid: row.imagepublicid,
                slug: newSlug
            });      
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

    async getProductBySlug(slug) {
        try {
            const result = await pool.query(
                `SELECT p.*, c.categoryname
                FROM products p
                JOIN categories c ON p.categoryid = c.categoryid
                WHERE p.slug = $1`,
                [slug]
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
                row.isbn,
                row.soldcount,
                row.isactive,
                row.categoryid,
                row.categoryname,
                row.imagepublicid,
                row.slug
            );
        } catch(error) {
            console.log(`SQL ERROR: ${error}`);
            return [];
        }
    }
}

module.exports = new ProductRepository();