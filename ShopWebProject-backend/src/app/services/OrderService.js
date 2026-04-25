const pool = require('../../config/db');
const OrderRepository = require('../repositories/OrderRepository');
const OrderItemRepository = require('../repositories/OrderItemRepository');
const CartRepository = require('../repositories/CartRepository');
const CartItemRepository = require('../repositories/CartItemRepository');

class OrderService {
    async getAllOrders() {
        const orders = await OrderRepository.getAllOrders();
        return orders;
    }

    async getOrderById(orderid) {
        const order = await OrderRepository.getOrderById(orderid);
        return order;
    }

    // Kiểm tra điều kiện -> đổi trạng thái cart thành 'inactive' và tạo order
    async checkout(userid) {
        const client = await pool.connect();
        
        try {
            await client.query('BEGIN');

            const cart = await CartRepository.findActiveCartByUserId(userid, client);
            if (!cart) {
                throw new Error('Active cart not found');
            }
            const items = await CartItemRepository.findCartItemsByCartId(cart.cartid, client);

            if (items.length === 0) {
                throw new Error('Cart is empty');
            }

            let total = 0;
            for(let item of items) {
                total += item.priceattime * item.quantity;
            }

            const order = await OrderRepository.createOrder(
                userid,
                total,
                client
            );

            for(let item of items) {
                await OrderItemRepository.createOrderItem(
                    order.orderid,
                    item.productid,
                    item.quantity,
                    item.priceattime,
                    client
                );
            }

            await CartRepository.updateStatus(cart.cartid, 'inactive', client);

            await client.query('COMMIT');

            return order;
        } catch(error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }
    }
}

module.exports = new OrderService();