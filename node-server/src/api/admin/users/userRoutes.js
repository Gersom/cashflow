const { Router } = require('express')
const { asyncHandler } = require('@middlewares/asyncHandler')
const UserController = require('./userController')

const router = Router()

router.get('/', asyncHandler(UserController.getAllUsers))
router.get('/:id', asyncHandler(UserController.getUser))
// router.post("/", asyncHandler(UserController.createUser));
// router.put("/:id", asyncHandler(UserController.updateUser));
// router.delete("/:id", asyncHandler(UserController.deleteUser));

module.exports = router