const express = require('express')
const router = express.Router()
const { asyncHandler } = require('@middlewares/asyncHandler')
const {
  getAllCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory
} = require('./categoriesHandler')

router.get('/', asyncHandler(getAllCategories))
router.get('/:id', asyncHandler(getCategory))
router.post('/', asyncHandler(createCategory))
router.put('/:id', asyncHandler(updateCategory))
router.delete('/:id', asyncHandler(deleteCategory))

module.exports = router