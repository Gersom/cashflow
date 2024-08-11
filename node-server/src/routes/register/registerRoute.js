const express = require("express");
const router = express.Router();

router.get('/', (req, res) => res.send('Envia un POST'));

router.post("/", (req, res) => {
  res.json({
    message: 'Body recibido',
    data: req.body
  });
});

module.exports = router;