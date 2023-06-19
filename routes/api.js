const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

router.get("/", (req, res) => {
  res.json({ message: "Api home page..." });
});

router.get("/user", userController.user_get);
router.post("/user", userController.user_post);
router.post("/user/login", userController.user_login);

module.exports = router;
