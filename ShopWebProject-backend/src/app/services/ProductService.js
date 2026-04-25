const cloudinary = require('../../config/cloudinary');
const fs = require('fs');
const ProductRepository = require('../repositories/ProductRepository');

class ProductService {
    async getAllProducts(page, limit) {
        const products = await ProductRepository.getAllRepo(page, limit);
        return products;
    }

    async getProductById(id) {
        const product = await ProductRepository.getIdRepo(id);
        return product;
    }

    async createNewProduct(name, description, price, quantity, categoryid, file) {
        const uploadResult = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                { folder: 'products' },
                (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                }
            );

            stream.end(file.buffer);

        });

        const imageUrl = uploadResult.secure_url;

        const newProduct = await ProductRepository.createRepo(
            name,
            description,
            imageUrl,
            price,
            quantity,
            categoryid
        );

        return newProduct;
    }

    async deleteProduct(id) {
        const deletedProduct = await ProductRepository.deleteRepo(id);
        return deletedProduct;
    }

    async updateProduct(id, name, description, price, quantity, categoryid) {
        const updatedProduct = await ProductRepository.updateRepo(id, name, description, price, quantity, categoryid);
        return updatedProduct;
    }

    async caculateTotalProducts() {
        const total = await ProductRepository.caculateTotalProductsRepo();
        return total;
    }
}

module.exports = new ProductService();