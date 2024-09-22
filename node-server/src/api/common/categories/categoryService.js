const { CategoryModel, UserModel } = require('@models')
const { NotFoundError, ValidationError } = require('@utils/apiErrors')
const { CategoryDTO } = require('./categoryDTOs')

const CategoryService = {
  async getAllCategories (id) {
    const { selectedAccountId } = await UserModel.findDataById(id)
    const categories = await CategoryModel.findAllDataQuery({ accountId: selectedAccountId })

    return categories.map(category => new CategoryDTO(category))
  },

  // this exixts if we want to get all categories for a specific account
  // but whitout change the selected account in the user model
  async getAllCategoriesByAccountId (accountId) {
    return await CategoryModel.findAllDataQuery({ accountId })
  },

  async getCategory (id) {
    const category = await CategoryModel.findDataById(id)
    if (!category) {
      throw new NotFoundError(`Category with id ${id} not found`)
    }
    return category
  },

  async postCategory (data) {
    if (!data.name) {
      throw new ValidationError('Category name is required')
    }
    await CategoryModel.create(data)
    return true
  },

  async updateCategory (id, data) {
    const updatedCategory = await CategoryModel.updateData(id, data)
    if (!updatedCategory) {
      throw new NotFoundError(`Category with id ${id} not found`)
    }
    return true
  },

  async deleteCategory (id) {
    const deletedCategory = await CategoryModel.removeData(id)
    if (!deletedCategory) {
      throw new NotFoundError(`Category with id ${id} not found`)
    }
    return true
  }
}

module.exports = CategoryService