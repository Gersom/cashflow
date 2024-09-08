const CategoryService = require("./categoryService.js");

const CategoryController = {
  async getAllCategories (req, res) {
    const result = await CategoryService.getAllCategories(req.user.id);
    res.status(200).json(result);
  },

  async getAllCategoriesByAccountId (req, res) {
    const { id } = req.body;
    const result = await CategoryService.getAllCategoriesByAccountId(id);
    res.status(200).json(result);
  },
  
  async getCategory (req, res) {
    const { id } = req.params;
    const result = await CategoryService.getCategory(id);
    res.status(200).json(result);
  },
  
  async createCategory (req, res) {
    const result = await CategoryService.postCategory(req.body);
    res.status(201).json(result);
  },
  
  async updateCategory (req, res) {
    const { id } = req.params;
    const result = await CategoryService.updateCategory(id, req.body);
    res.status(200).json(result);
  },
  
  async deleteCategory (req, res) {
    const { id } = req.params;
    const result = await CategoryService.deleteCategory(id);
    res.status(200).json(result);
  },
}

module.exports = CategoryController;