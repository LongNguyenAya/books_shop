class OrderItem {
    constructor(id, orderid, productid, quantity, priceattime) {
        this.oitemid = id;
        this.orderid = orderid;
        this.productid = productid;
        this.quantity = quantity;
        this.priceattime = priceattime;
    }
}

module.exports = OrderItem;