const { Router } = require("express");
const UserController = require("./userController");

const router = Router();

router.get("/", UserController.getAllUsers);
router.get("/:id", UserController.getUser);
// router.post("/", UserController.createUser);
// router.put("/:id", UserController.updateUser);
// router.delete("/:id", UserController.deleteUser);

module.exports = router;