const pool = require('../../config/db');
const Order = require('../models/Order');

class OrderRepository {
    async createOrder(userid, total, client=null) {
        try {
            const executor = client || pool;
            const result = await executor.query(
                `INSERT INTO orders(userid, total)
                VALUES ($1,$2)
                RETURNING *`,
                [userid, total]
            );

            const row = result.rows[0];

            return new Order(
                row.orderid, 
                row.userid, 
                row.total,
                row.status
            );
        } catch(error) {
            console.log(`SQL ERROR: ${error}`);
            throw error;
        }
    }

    async getAllOrders() {
        try {
            const result = await pool.query(
                `SELECT orderid, userid, total, status
                FROM orders
                ORDER BY createdat DESC`
            );

            return result.rows.map(
                row => new Order(
                    row.orderid,
                    row.userid,
                    row.total, 
                    row.status
                )
            );
        } catch(error) {
            console.log(`SQL ERROR: ${error}`);
            throw error;
        }
    }

    async getOrderById(orderid, client=null) {
        try {
            const executor = client || pool;
            const result = await executor.query(
                `SELECT orderid, userid, total, status
                FROM orders
                WHERE orderid = $1`,
                [orderid]
            );

            const row = result.rows[0];
              
            if(!row) {
                return null;
            } 

            return new Order(
                row.id, 
                row.userid, 
                row.total,
                row.status
            );
        } catch(error) {
            console.log(`SQL ERROR: ${error}`);
            throw error;
        }
    }
}

module.exports = new OrderRepository();