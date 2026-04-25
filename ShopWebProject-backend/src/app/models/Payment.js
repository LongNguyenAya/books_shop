class Payment {
    constructor(id, orderid, method, status) {
        this.paymentid = id;
        this.orderid = orderid;
        this.method = method;
        this.status = status;
    }
}

module.exports = Payment;