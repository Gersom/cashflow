const { Router } = require("express");
const { asyncHandler } = require("@middlewares/asyncHandler");
const CategoryController = require("./categoryController.js");

const router = Router();

router.get("/", asyncHandler(CategoryController.getAllCategories));
router.get("/:id", asyncHandler(CategoryController.getCategory));
// router.post("/", asyncHandler(CategoryController.createCategory));
// router.put("/:id", asyncHandler(CategoryController.updateCategory));
// router.delete("/:id", asyncHandler(CategoryController.deleteCategory));

module.exports = router;