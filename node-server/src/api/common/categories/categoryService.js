const { CategoryModel, UserModel } = require("@models");
const { NotFoundError, ValidationError } = require("@utils/apiErrors");

const CategoryService = {
  async getAllCategories (id) {
    const { selectedAccountId } = await UserModel.findDataById(id);
    const categories = await CategoryModel.findAllDataQuery({accountId: selectedAccountId});
    
    return {
      data: categories,
      count: categories.length,
      success: 'Categories retrieved successfully'
    };
  },

  //this exixts if we want to get all categories for a specific account
  //but whitout change the selected account in the user model
  async getAllCategoriesByAccountId (accountId) {
    const categories = await CategoryModel.findAllDataQuery({accountId: accountId});
    return {
      data: categories,
      count: categories.length,
      success: 'Categories retrieved successfully'
    };
  },
  
  async getCategory (id) {
    const category = await CategoryModel.findDataById(id);
    if (!category) {
      throw new NotFoundError(`Category with id ${id} not found`);
    }
    return {
      data: category,
      success: 'Category retrieved successfully'
    };
  },
  
  async postCategory (data) {
    if (!data.name) {
      throw new ValidationError("Category name is required");
    }
    await CategoryModel.create(data);
    return {
      success: 'Category created successfully'
    };
  },
  
  async updateCategory (id, data) {
    const updatedCategory = await CategoryModel.updateData(id, data);
    if (!updatedCategory) {
      throw new NotFoundError(`Category with id ${id} not found`);
    }
    return {
      success: 'Category updated successfully'
    };
  },
  
  async deleteCategory (id) {
    const deletedCategory = await CategoryModel.removeData(id);
    if (!deletedCategory) {
      throw new NotFoundError(`Category with id ${id} not found`);
    }
    return {
      success: 'Category deleted successfully'
    };
  },
}

module.exports = CategoryService;