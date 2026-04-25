const pool = require('../../config/db');
const Cart = require('../models/Cart');

class CartRepository {
    async getAllCarts() {
        try {
            const result = await pool.query(
                `SELECT cartid, userid, status
                FROM carts`
            );
            return result.rows.map(
                row => new Cart(
                    row.cartid, 
                    row.userid, 
                    row.status
                )
            );
        } catch(error) {
            console.log(`SQL ERROR: ${error}`);
            return error;
        }
    }

    async findActiveCartByUserId(userid, client=null) {
        try {
            const executor = client || pool;
            const result = await executor.query(
                `SELECT cartid, userid, status
                FROM carts
                WHERE userid = $1
                AND status = 'active'`,
                [userid]
            );

            const row = result.rows[0];

            return new Cart(
                row.cartid, 
                row.userid, 
                row.status,
            );
        } catch(error) {
            console.log(`SQL ERROR: ${error}`);
            throw error;
        }
    }

    async findCheckedCartByStatusAndCartId(cartid, status) {
        try {
            const result = await pool.query(
                `SELECT cartid, userid, status
                FROM carts
                WHERE cartid = $1
                AND status = $2`,
                [cartid, status]
            );
            return result.rows.map(
                row => new Cart(
                    row.cartid, 
                    row.userid, 
                    row.status
                )
            );
        } catch(error) {
            console.log(`SQL ERROR: ${error}`);
            return error;
        }
    }

    async createRepo(userid, client=null) {
        try {
            const executor = client || pool;
            const result = await executor.query(
                `INSERT INTO carts(userid)
                VALUES ($1)
                RETURNING *`,
                [userid]
            );

            const row = result.rows[0];

            return new Cart(
                row.cartid, 
                row.userid, 
                row.status,
            );
        } catch(error) {
            console.log(`SQL ERROR: ${error}`);
            throw error;
        }
    }

    async updateStatus(id, status, client=null) {
        try {
            const executor = client || pool;
            const result = await executor.query(
                `UPDATE carts
                SET status = $1,
                updatedat = NOW()
                WHERE cartid = $2
                RETURNING *`,
                [status, id]
            );

            const row = result.rows[0];

            return new Cart(
                row.cartid, 
                row.userid, 
                row.status,
            );
        } catch(error) {
            console.log(`SQL ERROR: ${error}`);
            throw error;
        }
    }
}

module.exports = new CartRepository();