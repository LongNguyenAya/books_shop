const CartService = require('../services/CartService');

class CartController {
    // [GET] /api/admin/carts
    async getAllCarts(req, res) {
        try {
            const carts = await CartService.getAllCarts();
            res.json(carts);
        } catch(error) {
            res.status(500).json({ error: 'Cant find carts' });
        }
    }

    // [PATCH] /api/cart/items/:itemid
    async updateQuantityOfCartItem(req, res) {
        const itemid = req.params.itemid;
        const { quantity } = req.body;

        try {
            const item = await CartService.updateQuantityOfCartItem(itemid, quantity);
            res.json(item);
        } catch(error) {
            res.status(400).json({ error: 'Cant update quantity of cart item' });
        }
    }

    // [DELETE] /api/cart/items/:itemid
    async removeCartItem(req, res) {
        const itemid = req.params.itemid;
        const userid = req.user.id;

        try {
            const deletedItem = await CartService.removeCartItem(itemid, userid);
            res.json(deletedItem);
        } catch(error) {
            res.status(400).json({ error: 'Cant remove cart item from cart' });
        }
    }

    // [POST] /api/cart/items
    async addProductToCart(req, res) {
        const userid = req.user.id;
        const { productid, quantity } = req.body;

        try {
            const item = await CartService.addProductToCart(userid, productid, quantity);
            res.json(item);
        } catch(error) {
            res.status(400).json({ error: 'Cant add product to cart' });
        }
    }
}

module.exports = new CartController();