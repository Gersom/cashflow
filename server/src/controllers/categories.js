const { CategoryModel } = require("@models");
const { NotFoundError, ValidationError } = require("@utils/errors");

const getAllCategoriesController = async (query = {}) => {
  const categories = await CategoryModel.findAllData(query);
  return {
    data: categories,
    count: categories.length,
    success: 'Categories retrieved successfully'
  };
};

const getCategoryController = async (id) => {
  const category = await CategoryModel.findOneData(id);
  if (!category) {
    throw new NotFoundError(`Category with id ${id} not found`);
  }
  return {
    data: category,
    success: 'Category retrieved successfully'
  };
};

const postCategoryController = async (data) => {
  if (!data.name) {
    throw new ValidationError("Category name is required");
  }
  await CategoryModel.create(data);
  return {
    success: 'Category created successfully'
  };
};

const updateCategoryController = async (id, data) => {
  const updatedCategory = await CategoryModel.updateData(id, data);
  if (!updatedCategory) {
    throw new NotFoundError(`Category with id ${id} not found`);
  }
  return {
    success: 'Category updated successfully'
  };
};

const deleteCategoryController = async (id) => {
  const deletedCategory = await CategoryModel.removeData(id);
  if (!deletedCategory) {
    throw new NotFoundError(`Category with id ${id} not found`);
  }
  return {
    success: 'Category deleted successfully'
  };
};

module.exports = {
  getAllCategoriesController,
  getCategoryController,
  postCategoryController,
  updateCategoryController,
  deleteCategoryController
};