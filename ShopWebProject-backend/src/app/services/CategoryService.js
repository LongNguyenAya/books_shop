const CategoryRepository = require('../repositories/CategoryRepository');

class CategoryService {
    async getAllCategories() {
        const categories = await CategoryRepository.getAllRepo();
        return categories;
    }

    async getCategoryById(id) {
        const category = await CategoryRepository.getIdRepo(id);
        return category;
    }

    async createNewCategory(name) {
        const newCategory = await CategoryRepository.createRepo(name);
        return newCategory;
    }

    async deleteCategory(id) {
        const deletedCategory = await CategoryRepository.deleteRepo(id);
        return deletedCategory;
    }

    async updateCategory(id, name) {
        const updatedCategory = await CategoryRepository.updateRepo(id, name);
        return updatedCategory;
    }
}

module.exports = new CategoryService();