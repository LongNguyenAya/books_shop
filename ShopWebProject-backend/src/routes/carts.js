const express = require('express');
const router = express.Router();

const cartController = require('../app/controllers/CartController');

router.get('/', cartController.getAllCarts);
router.post('/items', cartController.addProductToCart);
router.patch('/items/:itemid', cartController.updateQuantityOfCartItem);
router.delete('/items/:itemid', cartController.removeCartItem);

module.exports = router;
