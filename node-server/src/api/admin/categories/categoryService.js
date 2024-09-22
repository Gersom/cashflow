const { CategoryModel } = require('@models')
const { NotFoundError, ValidationError } = require('@utils/apiErrors')

const CategoryService = {
  async getAllCategories (query = {}) {
    const categories = await CategoryModel.findAllData(query)
    return {
      data: categories,
      count: categories.length,
      success: 'Categories retrieved successfully'
    }
  },

  async getCategory (id) {
    const category = await CategoryModel.findDataById(id)
    if (!category) {
      throw new NotFoundError(`Category with id ${id} not found`)
    }
    return {
      data: category,
      success: 'Category retrieved successfully'
    }
  },

  async postCategory (data) {
    if (!data.name) {
      throw new ValidationError('Category name is required')
    }
    await CategoryModel.create(data)
    return {
      success: 'Category created successfully'
    }
  },

  async updateCategory (id, data) {
    const updatedCategory = await CategoryModel.updateData(id, data)
    if (!updatedCategory) {
      throw new NotFoundError(`Category with id ${id} not found`)
    }
    return {
      success: 'Category updated successfully'
    }
  },

  async deleteCategory (id) {
    const deletedCategory = await CategoryModel.removeData(id)
    if (!deletedCategory) {
      throw new NotFoundError(`Category with id ${id} not found`)
    }
    return {
      success: 'Category deleted successfully'
    }
  }
}

module.exports = CategoryService