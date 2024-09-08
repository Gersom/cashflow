const { Router } = require("express");
const { asyncHandler } = require("@middlewares/asyncHandler");
const { authenticateAndAuthorize } = require("@middlewares/resourseHandler");
const UserController = require("./userController");

const router = Router();

router.get("/profile", 
    authenticateAndAuthorize('user'), 
    asyncHandler(UserController.getUser));

router.put("/profile", 
    authenticateAndAuthorize('user'), 
    asyncHandler(UserController.updateUser));

router.patch("/select-account", 
    authenticateAndAuthorize('account'),
    asyncHandler(UserController.changeSelectedAccount));

// router.delete("/:id", asyncHandler(UserController.deleteUser));

module.exports = router;