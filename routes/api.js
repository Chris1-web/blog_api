const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

router.get("/", (req, res) => {
  res.json({ message: "Api home page..." });
});

router.get("/user", userController.user_get);

module.exports = router;