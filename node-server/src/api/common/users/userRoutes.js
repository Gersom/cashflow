const { Router } = require("express");
const { asyncHandler } = require("@middlewares/asyncHandler");
const { authenticateAndAuthorize } = require("@middlewares/resourseHandler");
const UserController = require("./userController");

const router = Router();

router.get("/:id", authenticateAndAuthorize('user') ,asyncHandler(UserController.getUser));
// router.put("/:id", asyncHandler(UserController.updateUser));
// router.delete("/:id", asyncHandler(UserController.deleteUser));

module.exports = router;