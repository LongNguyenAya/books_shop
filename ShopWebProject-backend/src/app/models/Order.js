class Order {
    constructor(id, userid, total, status) {
        this.orderid = id;
        this.userid = userid;
        this.total = total;
        this.status = status;
    }
}

module.exports = Order;