const CategoryService = require('./categoryService.js')
const { responseSuccess, dataSuccess } = require('@utils/apiSuccess')

const CategoryController = {
  async getAllCategories (req, res) {
    const categories = await CategoryService.getAllCategories(req.user.id)
    res.status(200).json(dataSuccess('Categories retrieved successfully', categories))
  },

  async getAllCategoriesByAccountId (req, res) {
    const { id } = req.body
    const categories = await CategoryService.getAllCategoriesByAccountId(id)
    res.status(200).json(dataSuccess('Categories retrieved successfully', categories))
  },

  async getCategory (req, res) {
    const { id } = req.params
    const category = await CategoryService.getCategory(id)
    res.status(200).json(dataSuccess('Category retrieved successfully', category))
  },

  async createCategory (req, res) {
    await CategoryService.postCategory(req.body)
    res.status(201).json(responseSuccess('Category created successfully'))
  },

  async updateCategory (req, res) {
    const { id } = req.params
    await CategoryService.updateCategory(id, req.body)
    res.status(200).json(responseSuccess('Category updated successfully'))
  },

  async deleteCategory (req, res) {
    const { id } = req.params
    await CategoryService.deleteCategory(id)
    res.status(200).json(responseSuccess('Category deleted successfully'))
  }
}

module.exports = CategoryController