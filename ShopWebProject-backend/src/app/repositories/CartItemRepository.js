const pool = require('../../config/db');
const CartItem = require('../models/CartItem');

class CartItemRepository {
    async createNewItem(cartid, productid, quantity, priceattime, client=null) {
        try {
            const executor = client || pool;
            const result = await executor.query(
                `INSERT INTO cart_items(cartid, productid, quantity, priceattime)
                VALUES ($1,$2,$3,$4)
                RETURNING *`,
                [cartid, productid, quantity, priceattime]
            );

            const row = result.rows[0];

            return new CartItem(
                row.itemid,
                row.cartid, 
                row.productid, 
                row.quantity,
                row.priceattime
            );
        } catch(error) {
            console.log(`SQL ERROR: ${error}`);
            throw error;
        }
    }

    async findCartItemsByCartId(cartid, client=null) {
        try {
            const executor = client || pool;
            const result = await executor.query(
                `SELECT *
                FROM cart_items
                WHERE cartid = $1`,
                [cartid]
            );

            return result.rows.map(
                row => new CartItem(
                    row.itemid,
                    row.cartid, 
                    row.productid, 
                    row.quantity,
                    row.priceattime
                )
            );
        } catch(error) {
            console.log(`SQL ERROR: ${error}`);
            throw error;
        }
    }

    async findCartIdAndProductId(cartid, productid) {
        try {
            const result = await pool.query(
                `SELECT *
                FROM cart_items
                WHERE cartid = $1
                AND productid = $2`,
                [cartid, productid]
            );

            return result.rows.map(
                row => new CartItem(
                    row.itemid,
                    row.cartid, 
                    row.productid, 
                    row.quantity,
                    row.priceattime
                )
            );
        } catch(error) {
            console.log(`SQL ERROR: ${error}`);
            throw error;
        }
    }

    async updateQuantity(id, quantity, client=null) {
        try {
            const executor = client || pool;
            const result = await executor.query(
                `UPDATE cart_items
                SET quantity = $1
                WHERE itemid = $2
                RETURNING *`,
                [quantity, id]
            );

            if (!result.rows || result.rows.length === 0) {
                throw new Error('Cart item not found');
            }

            const row = result.rows[0];

            return new CartItem(
                row.itemid,
                row.cartid, 
                row.productid, 
                row.quantity,
                row.priceattime
            );
        } catch(error) {
            console.log(`SQL ERROR: ${error}`);
            throw error;
        }
    }

    async deleteCartItem(id, client=null) {
        try {
            const executor = client || pool;
            const result = await executor.query(
                `DELETE FROM cart_items
                WHERE itemid = $1`,
                [id]
            );
            return { success: true, message: `Cart item with id=${id} deleted!` };
        } catch(error) {
            console.log(`SQL ERROR: ${error}`);
            return error;
        }
    }

    async findCartItemByUserID(itemid, userid, client=null) {
        try {
            const executor = client || pool;
            const result = await executor.query(
                `SELECT ci.*
                FROM cart_items ci
                JOIN carts c
                ON ci.cartid = c.cartid
                WHERE ci.itemid = $1
                AND c.userid = $2`,
                [itemid, userid]
            );

            const row = result.rows[0];

            return new CartItem(
                row.itemid,
                row.cartid, 
                row.productid, 
                row.quantity,
                row.priceattime
            );
        } catch(error) {
            console.log(`SQL ERROR: ${error}`);
            throw error;
        }
    }
}

module.exports = new CartItemRepository();