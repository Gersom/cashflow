const { Router } = require("express");
const AccountController = require("./accountController.js");

const router = Router();

router.get("/", AccountController.getAllAccounts);
router.get("/:id", AccountController.getAccount);
// router.post("/", AccountController.createAccount);
// router.put("/:id", AccountController.updateAccount);
// router.delete("/:id", AccountController.deleteAccount);

module.exports = router;