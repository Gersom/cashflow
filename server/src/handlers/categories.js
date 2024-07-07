const {
  getAllCategoriesController,
  getCategoryController,
  postCategoryController,
  updateCategoryController,
  deleteCategoryController
} = require("@controllers/categories");

const getAllCategories = async (req, res) => {
  const result = await getAllCategoriesController(req.query);
  res.status(200).json(result);
};

const getCategory = async (req, res) => {
  const { id } = req.params;
  const result = await getCategoryController(id);
  res.status(200).json(result);
};

const createCategory = async (req, res) => {
  const result = await postCategoryController(req.body);
  res.status(201).json(result);
};

const updateCategory = async (req, res) => {
  const { id } = req.params;
  const result = await updateCategoryController(id, req.body);
  res.status(200).json(result);
};

const deleteCategory = async (req, res) => {
  const { id } = req.params;
  const result = await deleteCategoryController(id);
  res.status(200).json(result);
};

module.exports = {
  getAllCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory
};