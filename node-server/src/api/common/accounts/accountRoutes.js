const { Router } = require("express");
const { asyncHandler } = require("@middlewares/asyncHandler");
const { authenticateAndAuthorize } = require("@middlewares/resourseHandler");
const AccountController = require("./accountController.js");

const router = Router();

router.get("/", authenticateAndAuthorize('account') ,asyncHandler(AccountController.getAllAccounts));
router.patch("/change-currency", authenticateAndAuthorize('account') ,asyncHandler(AccountController.changeCurrecy));
// router.get("/:id", asyncHandler(AccountController.getAccount));
// router.post("/", asyncHandler(AccountController.createAccount));
// router.put("/:id", asyncHandler(AccountController.updateAccount));
// router.delete("/:ids", asyncHandler(AccountController.deleteAccount));

module.exports = router;