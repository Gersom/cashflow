const { Router } = require("express");
const { asyncHandler } = require("@middlewares/asyncHandler");
const { authenticateAndAuthorize } = require("@middlewares/resourseHandler");
const CategoryController = require("./categoryController.js");

const router = Router();

router.get("/", authenticateAndAuthorize('account') , asyncHandler(CategoryController.getAllCategories));
router.get("/account", authenticateAndAuthorize('account') , asyncHandler(CategoryController.getAllCategoriesByAccountId));
// router.get("/:id", asyncHandler(CategoryController.getCategory));
// router.post("/", asyncHandler(CategoryController.createCategory));
// router.put("/:id", asyncHandler(CategoryController.updateCategory));
// router.delete("/:id", asyncHandler(CategoryController.deleteCategory));

module.exports = router;