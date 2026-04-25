class CartItem {
    constructor(id, cartid, productid, quantity, priceattime) {
        this.itemid = id;
        this.cartid = cartid;
        this.productid = productid;
        this.quantity = quantity;
        this.priceattime = priceattime;
    }
}

module.exports = CartItem;