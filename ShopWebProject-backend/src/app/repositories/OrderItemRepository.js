const pool = require('../../config/db');
const OrderItem = require('../models/OrderItem');

class OrderItemRepository {
    async createOrderItem(orderid, productid, quantity, priceattime, client=null) {
        try {
            const executor = client || pool;
            const result = await executor.query(
                `INSERT INTO order_items(orderid, productid, quantity, priceattime)
                 VALUES ($1,$2,$3,$4)
                 RETURNING *`,
                [orderid, productid, quantity, priceattime]
            );

            const row = result.rows[0];

            return new OrderItem(
                row.oitemid, 
                row.orderid, 
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

module.exports = new OrderItemRepository();
