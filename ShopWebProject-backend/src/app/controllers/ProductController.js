const ProductService = require('../services/ProductService');

class ProductController {
    // [GET] /api/products?page=1&limit=15
    async getAll(req, res) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 15;

            const products = await ProductService.getAllProducts(page, limit);
            res.json(products);
        } catch(error) {
            res.status(400).json({ error: 'Cant find products' });
        }
    }

    // [GET] /api/products/:id
    async getId(req, res) {
        const id = req.params.id;
        try {
            const product = await ProductService.getProductById(id);
            res.json(product);
        } catch(error) {
            res.status(400).json({ error: `Cant find product with id=${id}` });
        }
    }

    // [POST] /api/products
    async create(req, res) {
        const { name, description, price, quantity, categoryid } = req.body;
        const file = req.file;
        try {
            const newProduct = await ProductService.createNewProduct(name, description, price, quantity, categoryid, file);
            res.json(newProduct);
        } catch(error) {
            res.status(400).json({ error: error.message });
        }
    }

    // [DELETE] /api/products/:id
    async delete(req, res) {
        const id = req.params.id;
        try {
            const result = await ProductService.deleteProduct(id);
            res.json(result);
        } catch(error) {
            res.status(400).json({ error: `Cant delete product with id=${id}` });
        }
    }

    // [PUT] /api/products/:id
    async update(req, res) {
        const id = req.params.id;
        const { name, description, price, quantity, categoryid } = req.body;
        try {
            const updatedCategory = await ProductService.updateProduct(id, name, description, price, quantity, categoryid);
            res.json(updateProduct);
        } catch(error) {
            res.status(400).json({ error: `Cant update product with id=${id}` });
        }
    }

    // [GET] /api/products/total
    async totalProducts(req, res) {
        try {
            const total = await ProductService.caculateTotalProducts();
            res.json({ total });
        } catch(error) {
            res.status(400).json({ error: 'Cant calculate total products' });
        }
    }
}

module.exports = new ProductController();