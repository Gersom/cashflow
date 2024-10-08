const { Router } = require("express");
const { asyncHandler } = require("@middlewares/asyncHandler");
const AccountController = require("./accountController.js");

const router = Router();

router.get("/", asyncHandler(AccountController.getAllAccounts));
router.get("/:id", asyncHandler(AccountController.getAccount));
// router.post("/", asyncHandler(AccountController.createAccount));
// router.put("/:id", asyncHandler(AccountController.updateAccount));
// router.delete("/:ids", asyncHandler(AccountController.deleteAccount));

module.exports = router;