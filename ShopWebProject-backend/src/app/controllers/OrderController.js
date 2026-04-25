const OrderService = require('../services/OrderService');

class OrderController {
    // [GET] /api/orders
    async getAllOrders(req, res) {
        try {
            const orders = await OrderService.getAllOrders();
            res.json(orders);
        } catch(error) {
            res.status(400).json({ error: 'Cant find orders' });
        }
    }

    // [GET] /api/orders/:id
    async getOrderById(req, res) {
        const orderid = req.params.id;
        try {
            const order = await OrderService.getOrderById(orderid);
            res.json(order);
        } catch(error) {
            res.status(400).json({ error: `Cant find order with id=${orderid}` });
        }
    }

    // [POST] /api/orders/checkout
    async checkout(req, res) {
        const userid = req.user.id;
        try {
            const order = await OrderService.checkout(userid);
            res.json(order);
        } catch(error) {
            res.status(400).json({ error: `Cant check out order` });
        }
    }
}

module.exports = new OrderController();