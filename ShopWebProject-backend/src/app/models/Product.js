class Product {
    constructor(id, name, description, imageurl, price, quantity, categoryid, categoryname) {
        this.productid = id;
        this.productname = name;
        this.description = description;
        this.imageurl = imageurl;
        this.price = price;
        this.quantity = quantity;
        this.categoryid = categoryid;
        this.categoryname = categoryname;
    }
}

module.exports = Product;
