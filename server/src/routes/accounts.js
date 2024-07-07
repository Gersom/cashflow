const express = require("express");
const router = express.Router();
const { asyncHandler } = require("@middlewares/asyncHandler");
const {
  getAllAccounts,
  getAccount,
  createAccount,
  updateAccount,
  deleteAccount
} = require("@handlers/accounts");

router.get("/", asyncHandler(getAllAccounts));
router.get("/:id", asyncHandler(getAccount));
router.post("/", asyncHandler(createAccount));
router.put("/:id", asyncHandler(updateAccount));
router.delete("/:id", asyncHandler(deleteAccount));

module.exports = router;