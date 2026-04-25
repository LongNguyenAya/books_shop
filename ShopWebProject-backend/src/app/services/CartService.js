const pool = require('../../config/db');
const CartRepository = require('../repositories/CartRepository');
const CartItemRepository = require('../repositories/CartItemRepository');
const ProductRepository = require('../repositories/ProductRepository');

class CartService {
    async getAllCarts() {
        const carts = await CartRepository.getAllCarts();
        return carts;
    }

    // Cập nhật số lượng sản phẩm trong cart item
    async updateQuantityOfCartItem(itemid, quantity) { 
        const client = await pool.connect();

        try {
            await client.query('BEGIN');
            const item = await CartItemRepository.updateQuantity(itemid, quantity, client);
            if (item.quantity <= 0) {
                await CartItemRepository.deleteCartItem(item.itemid, client);
            } 
            await client.query('COMMIT');
            return item;
        } catch(error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }
    }

    // Thêm sản phẩm vào giỏ hàng (đồng thời tạo 1 giỏ hàng mới)
    async addProductToCart(userid, productid, quantity) {
        const client = await pool.connect();
        
        try {
            await client.query('BEGIN');

            const product = await ProductRepository.getIdRepo(productid, client);
            if (!product) {
                throw new Error('Product not found');
            }
            
            let cart = await CartRepository.findActiveCartByUserId(userid, client);
            if (!cart) {
                cart = await CartRepository.createRepo(userid, client);
            }

            let item;
            const existingProduct = await CartItemRepository.findCartIdAndProductId(cart.cartid, productid, client);
            if (!existingProduct) {
                item = await CartItemRepository.createNewItem(
                    cart.cartid, 
                    productid, 
                    quantity,
                    product.price, 
                    client
                );
            } else {
                item = await CartItemRepository.updateQuantity(
                    existingProduct.itemid,
                    existingProduct.quantity + quantity,
                    client
                )
            }

            await client.query('COMMIT');

            return item;
        } catch(error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }
    }

    // Bỏ cart item khỏi giỏ hàng
    async removeCartItem(itemid, userid) {
        const client = await pool.connect();

        try {
            await client.query('BEGIN');

            const item = await CartItemRepository.findCartItemByUserID(itemid, userid, client);
            if(!item) {
                throw new Error('Cart Item not founded');
            }

            const deletedItem = await CartItemRepository.deleteCartItem(itemid, client);

            await client.query('COMMIT');

            return deletedItem;
        } catch(error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }
    }
}

module.exports = new CartService();