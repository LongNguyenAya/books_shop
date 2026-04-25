const CategoryService = require('../services/CategoryService');

class CategoryController {
    // [GET] /api/categories
    async getAll(req, res) {
        try {
            const categories = await CategoryService.getAllCategories();
            res.json(categories);
        } catch(error) {
            res.status(400).json({ error: 'Cant find categories' });
        }
    }

    // [GET] /api/categories/:id
    async getId(req, res) {
        const id = req.params.id;
        try {
            const category = await CategoryService.getCategoryById(id);
            res.json(category);
        } catch(error) {
            res.status(400).json({ error: `Cant find category with id=${id}` });
        }
    }

    // [POST] /api/categories
    async create(req, res) {
        const { name } = req.body;
        try {
            const newCategory = await CategoryService.createNewCategory(name);
            res.json(newCategory);
        } catch(error) {
            res.status(400).json({ error: `Cant create category with name=${name}` });
        }
    }

    // [DELETE] /api/categories/:id
    async delete(req, res) {
        const id = req.params.id;
        try {
            const result = await CategoryService.deleteCategory(id);
            res.json(result);
        } catch(error) {
            res.status(400).json({ error: `Cant delete category with id=${id}` });
        }
    }

    // [PUT] /api/categories/:id
    async update(req, res) {
        const { id, name } = req.body;
        try {
            const updatedCategory = await CategoryService.updateCategory(id, name);
            res.json(updatedCategory);
        } catch(error) {
            res.status(400).json({ error: `Cant update category with id=${id}` });
        }
    }
}

module.exports = new CategoryController();