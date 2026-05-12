const ProductService = require('../services/ProductService');

class ProductController {
    // [GET] /api/products?page=1&limit=16
    async getAll(req, res) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 16;

            const products = await ProductService.getAllProducts(page, limit);
            res.json(products);
        } catch(error) {
            res.status(400).json({ error: 'Cant find products' });
        }
    }

    // [GET] /api/products/search?q=searchTerm&page=1&limit=16
    async search(req, res) {
        try {
            const searchTerm = req.query.q;
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 16;

            if (!searchTerm || searchTerm.trim() === '') {
                return res.status(400).json({ error: 'Search term is required' });
            }

            const products = await ProductService.searchProducts(searchTerm.trim(), page, limit);
            res.json(products);
        } catch(error) {
            console.error('Search error:', error);
            res.status(400).json({ error: 'Cant search products' });
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

    // [GET] /api/products/slug/:slug
    async getBySlug(req, res) {
        const slug = req.params.slug;
        try {
            const product = await ProductService.getProductBySlug(slug);
            res.json(product);
        } catch(error) {
            res.status(400).json({ error: `Cant find product with slug=${slug}` });
        }
    }

    // [POST] /api/products
    async create(req, res) {
        const { name, description, price, quantity, categoryname } = req.body;
        const file = req.file;
        try {
            const newProduct = await ProductService.createNewProduct(name, description, price, quantity, categoryname, file);
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
        const { name, description, price, quantity, categoryname } = req.body;
        try {
            const updatedCategory = await ProductService.updateProduct(id, name, description, price, quantity, categoryname);
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