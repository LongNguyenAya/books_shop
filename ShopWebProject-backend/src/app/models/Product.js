class Product {
    constructor(id, name, description, imageurl, price, quantity, categoryid, categoryname, soldcount, isactive) {
        this.productid = id;
        this.productname = name;
        this.description = description;
        this.imageurl = imageurl;
        this.price = price;
        this.quantity = quantity;
        this.categoryid = categoryid;
        this.categoryname = categoryname;
        this.soldcount = soldcount;
        this.isactive = isactive;   
    }
}

module.exports = Product;
