class Product {
    constructor(id, name, description, imageurl, price, quantity, isbn, soldcount, isactive, categoryid, categoryname, imagepublicid, slug) {
        this.productid = id;
        this.productname = name;
        this.description = description;
        this.imageurl = imageurl;
        this.price = price;
        this.quantity = quantity;
        this.isbn = isbn;
        this.soldcount = soldcount;
        this.isactive = isactive;
        this.categoryid = categoryid;
        this.categoryname = categoryname;
        this.imagepublicid = imagepublicid;
        this.slug = slug;
    }
}

module.exports = Product;
